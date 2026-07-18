const Auth = {
  _currentUser: null,
  _userRole: null,
  _listeners: [],
  _CACHE_KEY: 'sms_user_role',
  _UID_KEY: 'sms_user_uid',

  _cacheRole(uid, role) {
    try {
      localStorage.setItem(this._UID_KEY, uid);
      localStorage.setItem(this._CACHE_KEY, role);
    } catch (e) {}
  },

  _getCachedRole(uid) {
    try {
      const cached = localStorage.getItem(this._CACHE_KEY);
      if (cached) return cached;
    } catch (e) {}
    return null;
  },

  _clearCachedRole() {
    try {
      localStorage.removeItem(this._CACHE_KEY);
      localStorage.removeItem(this._UID_KEY);
    } catch (e) {}
  },

  init() {
    return new Promise((resolve) => {
      if (typeof firebase === 'undefined' || !firebase.auth) {
        resolve(null);
        return;
      }

      let resolved = false;
      const finish = (user, role) => {
        if (resolved) return;
        resolved = true;
        this._currentUser = user;
        this._userRole = role;
        this._notifyListeners(user, role);
        resolve(user);
      };

      setTimeout(() => {
        if (!resolved) {
          console.warn('Auth.init timeout - using cached role');
          const cached = this._getCachedRole(null);
          if (cached) {
            finish({ uid: localStorage.getItem(this._UID_KEY) }, cached);
          } else {
            finish(null, null);
          }
        }
      }, 8000);

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this._currentUser = user;
          const cached = this._getCachedRole(user.uid);
          if (cached) {
            this._cacheRole(user.uid, cached);
            finish(user, cached);
          }
          this._fetchUserRole(user.uid).then(role => {
            if (role) this._cacheRole(user.uid, role);
            finish(user, role);
          }).catch(() => {
            if (!resolved) finish(user, cached || null);
          });
        } else {
          this._clearCachedRole();
          finish(null, null);
        }
      });
    });
  },

  async _fetchUserRole(uid) {
    return new Promise((resolve) => {
      let done = false;
      const finish = (val) => { if (!done) { done = true; resolve(val); } };
      setTimeout(() => { finish(null); }, 5000);
      firebase.firestore().collection('users').doc(uid).get()
        .then(doc => finish(doc.exists ? doc.data().role : null))
        .catch(() => finish(null));
    });
  },

  async _ensureUserDoc(user, role) {
    try {
      const doc = await firebase.firestore().collection('users').doc(user.uid).get();
      if (!doc.exists) {
        await firebase.firestore().collection('users').doc(user.uid).set({
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || user.email || 'User',
          role: role,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (e) { console.error('ensureUserDoc error:', e); }
  },

  async login(email, password) {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
    let role = await this._fetchUserRole(result.user.uid);
    if (!role) {
      const pendingRole = localStorage.getItem(this._CACHE_KEY);
      if (pendingRole) {
        role = pendingRole;
      } else {
        role = 'student';
      }
    }
    this._userRole = role;
    this._cacheRole(result.user.uid, role);
    this._ensureUserDoc(result.user, role).catch(() => {});
    return { user: result.user, role };
  },

  async loginAsParent(studentPhone, studentDob) {
    const db = firebase.firestore();

    const studentsSnapshot = await db.collection('students')
      .where('phone', '==', studentPhone)
      .limit(1)
      .get();

    if (studentsSnapshot.empty) {
      throw new Error('No student found with this mobile number. Please check and try again.');
    }

    const studentDoc = studentsSnapshot.docs[0];
    const studentData = studentDoc.data();

    if (!studentData.dob) {
      throw new Error('Student date of birth is not available in the system. Contact admin.');
    }

    const studentDobNormalized = studentData.dob;
    const inputDobNormalized = studentDob;

    if (studentDobNormalized !== inputDobNormalized) {
      throw new Error('Date of birth does not match our records. Please verify and try again.');
    }

    const parentEmail = `parent_${studentPhone}@sms.avsct.local`;

    let parentUser;
    try {
      const existingUsers = await db.collection('users')
        .where('linkedStudentPhone', '==', studentPhone)
        .limit(1)
        .get();

      if (!existingUsers.empty) {
        const existingUser = existingUsers.docs[0];
        const existingData = existingUser.data();
        parentUser = await firebase.auth().signInWithEmailAndPassword(
          existingData.email,
          `Parent@${studentPhone}`
        );
      } else {
        parentUser = await firebase.auth().createUserWithEmailAndPassword(
          parentEmail,
          `Parent@${studentPhone}`
        );

        await db.collection('users').doc(parentUser.user.uid).set({
          uid: parentUser.user.uid,
          email: parentEmail,
          name: `Parent of ${studentData.name}`,
          role: 'parent',
          linkedStudentId: studentDoc.id,
          linkedStudentPhone: studentPhone,
          linkedStudentName: studentData.name,
          linkedStudentRegNo: studentData.registerNumber || '',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        await db.collection('parents').add({
          uid: parentUser.user.uid,
          name: `Parent of ${studentData.name}`,
          email: parentEmail,
          phone: studentPhone,
          role: 'parent',
          linkedStudentId: studentDoc.id,
          linkedStudentName: studentData.name,
          linkedStudentRegNo: studentData.registerNumber || '',
          status: 'active',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (authError) {
      if (authError.code === 'auth/email-already-in-use') {
        parentUser = await firebase.auth().signInWithEmailAndPassword(
          parentEmail,
          `Parent@${studentPhone}`
        );
      } else {
        throw authError;
      }
    }

    const role = await this._fetchUserRole(parentUser.user.uid);
    if (!role) {
      await firebase.auth().signOut();
      throw new Error('Could not verify parent role. Contact administrator.');
    }

    this._userRole = role;
    this._cacheRole(parentUser.user.uid, role);

    await parentUser.user.updateProfile({
      displayName: `Parent of ${studentData.name}`
    });

    return {
      user: parentUser.user,
      role,
      studentName: studentData.name,
      studentId: studentDoc.id
    };
  },

  async register(userData) {
    const { email, password, role, name } = userData;
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await result.user.updateProfile({ displayName: name });
    await firebase.firestore().collection('users').doc(result.user.uid).set({
      uid: result.user.uid,
      email,
      name,
      role,
      emailVerified: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    try {
      await result.user.sendEmailVerification();
    } catch (e) { console.error('Verification email error:', e); }
    await firebase.auth().signOut();
    return result.user;
  },

  async logout() {
    await firebase.auth().signOut();
    this._currentUser = null;
    this._userRole = null;
    this._clearCachedRole();
    window.location.href = (typeof BASE_URL !== 'undefined' ? BASE_URL : '') + '/login.html';
  },

  async resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  },

  async updatePassword(newPassword) {
    if (!this._currentUser) throw new Error('Not authenticated');
    return this._currentUser.updatePassword(newPassword);
  },

  getCurrentUser() {
    return this._currentUser;
  },

  getRole() {
    return this._userRole;
  },

  isAuthenticated() {
    return !!this._currentUser;
  },

  onAuthChange(callback) {
    this._listeners.push(callback);
  },

  _notifyListeners(user, role) {
    this._listeners.forEach(cb => cb(user, role));
  },

  requireAuth(expectedRole) {
    const base = typeof BASE_URL !== 'undefined' ? BASE_URL : '';
    if (!this._currentUser) {
      window.location.href = base + '/login.html';
      return false;
    }
    if (expectedRole && this._userRole !== expectedRole) {
      window.location.href = base + '/login.html';
      return false;
    }
    return true;
  },

  getRedirectPath(role) {
    const base = typeof BASE_URL !== 'undefined' ? BASE_URL : '';
    const paths = {
      admin: base + '/dashboard/admin/index.html',
      faculty: base + '/dashboard/faculty/index.html',
      student: base + '/dashboard/student/index.html',
      parent: base + '/dashboard/parent/index.html'
    };
    return paths[role] || base + '/login.html';
  }
};
