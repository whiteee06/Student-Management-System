function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 768) {
    sidebar?.classList.toggle('mobile-open');
    document.getElementById('mobileOverlay')?.classList.toggle('active');
  } else {
    sidebar?.classList.toggle('collapsed');
  }
}

function toggleDropdown(id) {
  const el = document.getElementById(id);
  el?.classList.toggle('active');
  const close = (e) => {
    if (!el.contains(e.target)) {
      el.classList.remove('active');
      document.removeEventListener('click', close);
    }
  };
  setTimeout(() => document.addEventListener('click', close), 10);
}

function handleSearch(e) {
  if (e.key === 'Enter') {
    const q = e.target.value.trim().toLowerCase();
    if (q) Toast.info('Search', `Searching for "${q}"...`);
  }
}

function handleFilter() {
  if (typeof window._filterCallback === 'function') window._filterCallback();
}

function navigateToProfile() {
  const role = Auth.getRole();
  window.location.href = (typeof BASE_URL !== 'undefined' ? BASE_URL : '') + `/dashboard/${role}/profile.html`;
}

function initDashboard(role, activePage) {
  Theme.init();
  DB.init();

  const renderDashboard = (user) => {
    document.getElementById('app').innerHTML = `
      <div class="app-layout">
        ${Components.sidebar(role, activePage)}
        <div class="main-content">
          ${Components.header()}
          <div class="page-content" id="pageContent">${Components.loadingSpinner()}</div>
        </div>
      </div>
      <div class="mobile-overlay" id="mobileOverlay" onclick="toggleSidebar()"></div>
    `;
    if (user) {
      document.getElementById('sidebarUserName').textContent = user.displayName || user.email;
      document.getElementById('sidebarAvatar').textContent = Utils.getInitials(user.displayName || user.email);
      document.getElementById('headerAvatar').textContent = Utils.getInitials(user.displayName || user.email);
    }
  };

  Auth.init().then(user => {
    if (Auth.requireAuth(role)) {
      renderDashboard(user);
      return;
    }
    const cachedRole = localStorage.getItem('sms_user_role');
    if (cachedRole === role) {
      Auth._userRole = cachedRole;
      Auth._currentUser = user || { uid: localStorage.getItem('sms_user_uid'), displayName: 'User' };
      renderDashboard(Auth._currentUser);
    }
  });
}

function loadPageContent(html) {
  const el = document.getElementById('pageContent');
  if (el) {
    el.style.opacity = '0';
    el.innerHTML = html;
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = '1';
    });
  }
}

function confirmDelete(message, onConfirm) {
  const id = 'confirmDeleteModal_' + Date.now();
  document.body.insertAdjacentHTML('beforeend', Components.confirmModal(id, 'Confirm Delete', message, 'Delete', 'btn-danger', onConfirm));
  Utils.showModal(id);
}

async function exportTableToCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
  const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr =>
    Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim())
  );
  Utils.exportToCSV(rows.map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  }), filename);
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
    if (Notifications._panel) {
      Notifications._panel.remove();
      Notifications._panel = null;
    }
  }
});
