const DB = {
  _db: null,

  init() {
    if (typeof firebase !== 'undefined' && firebase.firestore) {
      this._db = firebase.firestore();
    }
  },

  _col(name) {
    return this._db.collection(name);
  },

  // Generic CRUD
  async add(collection, data) {
    const docRef = await this._col(collection).add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return docRef.id;
  },

  async set(collection, id, data) {
    await this._col(collection).doc(id).set({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return id;
  },

  async get(collection, id) {
    const doc = await this._col(collection).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async getAll(collection, constraints = []) {
    let query = this._col(collection);
    constraints.forEach(c => {
      if (c.type === 'where') query = query.where(c.field, c.op, c.value);
      if (c.type === 'orderBy') query = query.orderBy(c.field, c.dir || 'asc');
      if (c.type === 'limit') query = query.limit(c.value);
    });
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async update(collection, id, data) {
    return this.set(collection, id, data);
  },

  async remove(collection, id) {
    await this._col(collection).doc(id).delete();
  },

  async count(collection, constraints = []) {
    const results = await this.getAll(collection, constraints);
    return results.length;
  },

  // Real-time listener
  onSnapshot(collection, callback, constraints = []) {
    let query = this._col(collection);
    constraints.forEach(c => {
      if (c.type === 'where') query = query.where(c.field, c.op, c.value);
      if (c.type === 'orderBy') query = query.orderBy(c.field, c.dir || 'asc');
    });
    return query.onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(data);
    });
  },

  // Batch operations
  batch() {
    return this._db.batch();
  },

  // Query helpers
  where(field, op, value) { return { type: 'where', field, op, value }; },
  orderBy(field, dir) { return { type: 'orderBy', field, dir }; },
  limit(n) { return { type: 'limit', value: n }; },

  // Transaction
  async runTransaction(fn) {
    return this._db.runTransaction(fn);
  }
};
