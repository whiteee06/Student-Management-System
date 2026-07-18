const Components = {
  sidebar(role, activePage = '') {
    const menus = {
      admin: [
        { section: 'Main', items: [
          { icon: '&#9632;', text: 'Dashboard', href: '/dashboard/admin/index.html', id: 'dashboard' },
          { icon: '&#128196;', text: 'Notifications', href: '#', id: 'notifications', badge: 3 }
        ]},
        { section: 'Management', items: [
          { icon: '&#128100;', text: 'Students', href: '/dashboard/admin/students.html', id: 'students' },
          { icon: '&#128105;', text: 'Faculty', href: '/dashboard/admin/faculty.html', id: 'faculty' },
          { icon: '&#128106;', text: 'Parents', href: '/dashboard/admin/parents.html', id: 'parents' },
          { icon: '&#127979;', text: 'Departments', href: '/dashboard/admin/departments.html', id: 'departments' },
          { icon: '&#128218;', text: 'Subjects', href: '/dashboard/admin/subjects.html', id: 'subjects' }
        ]},
        { section: 'Academics', items: [
          { icon: '&#128197;', text: 'Timetable', href: '/dashboard/admin/timetable.html', id: 'timetable' },
          { icon: '&#9745;', text: 'Attendance', href: '/dashboard/admin/attendance.html', id: 'attendance' },
          { icon: '&#128202;', text: 'Marks', href: '/dashboard/admin/marks.html', id: 'marks' },
          { icon: '&#128221;', text: 'Assignments', href: '/dashboard/admin/assignments.html', id: 'assignments' },
          { icon: '&#128218;', text: 'Study Materials', href: '/dashboard/admin/materials.html', id: 'materials' }
        ]},
        { section: 'Activities', items: [
          { icon: '&#128196;', text: 'Notices', href: '/dashboard/admin/notices.html', id: 'notices' },
          { icon: '&#127891;', text: 'Events', href: '/dashboard/admin/events.html', id: 'events' },
          { icon: '&#128248;', text: 'Gallery', href: '/dashboard/admin/gallery.html', id: 'gallery' },
          { icon: '&#128176;', text: 'Reports', href: '/dashboard/admin/reports.html', id: 'reports' }
        ]},
        { section: 'System', items: [
          { icon: '&#9881;', text: 'Settings', href: '/dashboard/admin/settings.html', id: 'settings' },
          { icon: '&#128196;', text: 'Logs', href: '/dashboard/admin/logs.html', id: 'logs' }
        ]}
      ],
      faculty: [
        { section: 'Main', items: [
          { icon: '&#9632;', text: 'Dashboard', href: '/dashboard/faculty/index.html', id: 'dashboard' }
        ]},
        { section: 'Teaching', items: [
          { icon: '&#9745;', text: 'Attendance', href: '/dashboard/faculty/attendance.html', id: 'attendance' },
          { icon: '&#128221;', text: 'Assignments', href: '/dashboard/faculty/assignments.html', id: 'assignments' },
          { icon: '&#128218;', text: 'Study Materials', href: '/dashboard/faculty/materials.html', id: 'materials' },
          { icon: '&#128202;', text: 'Marks Entry', href: '/dashboard/faculty/marks.html', id: 'marks' }
        ]},
        { section: 'Activity', items: [
          { icon: '&#128100;', text: 'Students', href: '/dashboard/faculty/students.html', id: 'students' },
          { icon: '&#128196;', text: 'Notices', href: '/dashboard/faculty/notices.html', id: 'notices' },
          { icon: '&#127891;', text: 'Events', href: '/dashboard/faculty/events.html', id: 'events' },
          { icon: '&#128176;', text: 'Analytics', href: '/dashboard/faculty/analytics.html', id: 'analytics' }
        ]},
        { section: 'Personal', items: [
          { icon: '&#9998;', text: 'Leave Requests', href: '/dashboard/faculty/leave.html', id: 'leave' },
          { icon: '&#9881;', text: 'Profile', href: '/dashboard/faculty/profile.html', id: 'profile' }
        ]}
      ],
      student: [
        { section: 'Main', items: [
          { icon: '&#9632;', text: 'Dashboard', href: '/dashboard/student/index.html', id: 'dashboard' },
          { icon: '&#128100;', text: 'My Profile', href: '/dashboard/student/profile.html', id: 'profile' }
        ]},
        { section: 'Academics', items: [
          { icon: '&#9745;', text: 'Attendance', href: '/dashboard/student/attendance.html', id: 'attendance' },
          { icon: '&#128221;', text: 'Assignments', href: '/dashboard/student/assignments.html', id: 'assignments' },
          { icon: '&#128218;', text: 'Study Materials', href: '/dashboard/student/materials.html', id: 'materials' },
          { icon: '&#128197;', text: 'Timetable', href: '/dashboard/student/timetable.html', id: 'timetable' },
          { icon: '&#128202;', text: 'Results', href: '/dashboard/student/results.html', id: 'results' }
        ]},
        { section: 'Activity', items: [
          { icon: '&#128196;', text: 'Notices', href: '/dashboard/student/notices.html', id: 'notices' },
          { icon: '&#127891;', text: 'Events', href: '/dashboard/student/events.html', id: 'events' },
          { icon: '&#128248;', text: 'Gallery', href: '/dashboard/student/gallery.html', id: 'gallery' },
          { icon: '&#127942;', text: 'Achievements', href: '/dashboard/student/achievements.html', id: 'achievements' }
        ]},
        { section: 'Personal', items: [
          { icon: '&#9998;', text: 'Leave Request', href: '/dashboard/student/leave.html', id: 'leave' },
          { icon: '&#128274;', text: 'Password', href: '/dashboard/student/password.html', id: 'password' }
        ]}
      ],
      parent: [
        { section: 'Main', items: [
          { icon: '&#9632;', text: 'Dashboard', href: '/dashboard/parent/index.html', id: 'dashboard' },
          { icon: '&#128100;', text: 'My Child', href: '/dashboard/parent/child.html', id: 'child' }
        ]},
        { section: 'Activity', items: [
          { icon: '&#9745;', text: 'Attendance', href: '/dashboard/parent/attendance.html', id: 'attendance' },
          { icon: '&#128196;', text: 'Notices', href: '/dashboard/parent/notices.html', id: 'notices' },
          { icon: '&#9998;', text: 'Leave Status', href: '/dashboard/parent/leave.html', id: 'leave' },
          { icon: '&#127891;', text: 'Events', href: '/dashboard/parent/events.html', id: 'events' },
          { icon: '&#128222;', text: 'Faculty Contact', href: '/dashboard/parent/faculty.html', id: 'faculty' }
        ]},
        { section: 'Personal', items: [
          { icon: '&#9881;', text: 'Profile', href: '/dashboard/parent/profile.html', id: 'profile' },
          { icon: '&#128274;', text: 'Password', href: '/dashboard/parent/password.html', id: 'password' }
        ]}
      ]
    };

    const roleLabels = { admin: 'Admin Panel', faculty: 'Faculty Portal', student: 'Student Portal', parent: 'Parent Portal' };
    const menu = menus[role] || [];

    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">AI</div>
          <div class="sidebar-brand">
            <div class="sidebar-brand-title">AI&DS SMS</div>
            <div class="sidebar-brand-sub">${roleLabels[role]}</div>
          </div>
        </div>
        <nav class="sidebar-nav">
          ${menu.map(section => `
            <div class="nav-section">
              <div class="nav-section-title">${section.section}</div>
              ${section.items.map(item => `
                <a href="${item.href}" class="nav-item ${item.id === activePage ? 'active' : ''}" data-page="${item.id}">
                  <span class="nav-item-icon">${item.icon}</span>
                  <span class="nav-item-text">${item.text}</span>
                  ${item.badge ? `<span class="nav-item-badge">${item.badge}</span>` : ''}
                </a>
              `).join('')}
            </div>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <div class="sidebar-user" id="sidebarUser">
            <div class="sidebar-user-avatar" id="sidebarAvatar">?</div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name" id="sidebarUserName">Loading...</div>
              <div class="sidebar-user-role" id="sidebarUserRole">${Utils.capitalize(role)}</div>
            </div>
          </div>
        </div>
      </aside>
    `;
  },

  header(title = '') {
    return `
      <header class="top-header">
        <div class="header-left">
          <button class="sidebar-toggle" id="sidebarToggle" onclick="toggleSidebar()">&#9776;</button>
          <div class="header-search">
            <span class="header-search-icon">&#128269;</span>
            <input type="text" placeholder="Search students, faculty, events..." id="globalSearch" onkeyup="handleSearch(event)">
          </div>
        </div>
        <div class="header-right">
          <button class="header-btn theme-toggle" onclick="Theme.toggle()" data-tooltip="Toggle theme">&#9790;</button>
          <button class="header-btn" onclick="Notifications.showPanel()" data-tooltip="Notifications">
            &#128276;
            <span class="notification-dot"></span>
          </button>
          <div class="dropdown" id="profileDropdown">
            <button class="header-btn" onclick="toggleDropdown('profileDropdown')">
              <div class="avatar avatar-sm avatar-placeholder" id="headerAvatar" style="font-size:12px">?</div>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" onclick="navigateToProfile()">&#128100; My Profile</a>
              <a class="dropdown-item" href="#" onclick="Theme.toggle()">&#127769; Toggle Theme</a>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" onclick="Auth.logout()" style="color:var(--danger)">&#128682; Logout</button>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  statCard(icon, value, label, colorClass, delay = 0) {
    return `
      <div class="stat-card card animate-fade-in-up" style="animation-delay:${delay}ms">
        <div class="stat-icon" style="background:${colorClass === 'primary' ? 'rgba(37,99,235,0.1)' : colorClass === 'success' ? 'rgba(34,197,94,0.1)' : colorClass === 'warning' ? 'rgba(245,158,11,0.1)' : colorClass === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(6,182,212,0.1)'};color:${colorClass === 'primary' ? '#2563EB' : colorClass === 'success' ? '#22C55E' : colorClass === 'warning' ? '#F59E0B' : colorClass === 'danger' ? '#EF4444' : '#06B6D4'}">${icon}</div>
        <div class="stat-info">
          <div class="stat-value" data-count="${value}">${value}</div>
          <div class="stat-label">${label}</div>
        </div>
      </div>
    `;
  },

  pageHeader(title, subtitle = '', actions = '') {
    return `
      <div class="page-header flex items-center justify-between" style="flex-wrap:wrap;gap:12px">
        <div>
          <h1 class="page-title">${title}</h1>
          ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ''}
        </div>
        <div class="flex gap-2">${actions}</div>
      </div>
    `;
  },

  searchFilterBar(filters = []) {
    return `
      <div class="card mb-4" style="padding:16px">
        <div class="flex items-center gap-3" style="flex-wrap:wrap">
          <div class="header-search" style="flex:1;min-width:200px">
            <span class="header-search-icon">&#128269;</span>
            <input type="text" class="form-input" placeholder="Search..." style="padding-left:38px" id="searchInput" onkeyup="handleFilter()">
          </div>
          ${filters.map(f => `
            <select class="form-input form-select" style="width:auto;min-width:140px" id="filter_${f.id}" onchange="handleFilter()">
              <option value="">${f.label}</option>
              ${f.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
            </select>
          `).join('')}
        </div>
      </div>
    `;
  },

  pagination(totalItems, itemsPerPage, currentPage, callback) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return '';
    let html = '<div class="pagination" style="justify-content:center;margin-top:20px">';
    html += `<button class="pagination-btn" onclick="${callback}(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&#8249;</button>`;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="${callback}(${i})">${i}</button>`;
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        html += '<span style="padding:0 4px">...</span>';
      }
    }
    html += `<button class="pagination-btn" onclick="${callback}(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&#8250;</button>`;
    html += '</div>';
    return html;
  },

  emptyState(icon, title, text, actionText = '', actionFn = '') {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <h3 class="empty-state-title">${title}</h3>
        <p class="empty-state-text">${text}</p>
        ${actionText ? `<button class="btn btn-primary" onclick="${actionFn}">${actionText}</button>` : ''}
      </div>
    `;
  },

  confirmModal(id, title, message, confirmText = 'Confirm', confirmClass = 'btn-danger', onConfirm = '') {
    return `
      <div class="modal-overlay" id="${id}">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" onclick="Utils.hideModal('${id}')">&#10005;</button>
          </div>
          <div class="modal-body">
            <p style="color:var(--text-secondary);font-size:var(--font-size-sm)">${message}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" onclick="Utils.hideModal('${id}')">Cancel</button>
            <button class="btn ${confirmClass}" onclick="${onConfirm};Utils.hideModal('${id}')">${confirmText}</button>
          </div>
        </div>
      </div>
    `;
  },

  loadingSpinner(size = 40) {
    return `<div class="flex items-center justify-center" style="padding:60px">
      <div style="width:${size}px;height:${size}px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite"></div>
    </div>`;
  }
};
