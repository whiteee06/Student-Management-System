const Notifications = {
  _panel: null,

  showPanel() {
    if (this._panel) {
      this._panel.remove();
      this._panel = null;
      return;
    }
    this._panel = document.createElement('div');
    this._panel.className = 'card';
    this._panel.style.cssText = 'position:fixed;top:60px;right:20px;width:360px;max-height:480px;overflow-y:auto;z-index:500;box-shadow:var(--shadow-xl);animation:fadeInDown 0.2s ease-out;border:1px solid var(--border)';
    this._panel.innerHTML = `
      <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <h3 style="font-size:var(--font-size-base);font-weight:var(--font-semibold)">Notifications</h3>
        <button onclick="Notifications.markAllRead()" style="font-size:var(--font-size-xs);color:var(--primary);cursor:pointer;background:none;border:none">Mark all read</button>
      </div>
      <div id="notificationList">
        <div style="padding:40px 20px;text-align:center;color:var(--text-tertiary);font-size:var(--font-size-sm)">Loading notifications...</div>
      </div>
    `;
    document.body.appendChild(this._panel);
    this._load();
    setTimeout(() => {
      document.addEventListener('click', this._handleOutside = (e) => {
        if (!this._panel.contains(e.target) && !e.target.closest('[data-tooltip="Notifications"]')) {
          this._panel.remove();
          this._panel = null;
        }
      });
    }, 100);
  },

  async _load() {
    const listEl = document.getElementById('notificationList');
    if (!listEl) return;
    try {
      const user = Auth.getCurrentUser();
      if (!user) return;
      const notifs = await DB.getAll('notifications', [
        DB.where('target', 'in', ['all', Auth.getRole()]),
        DB.orderBy('createdAt', 'desc'),
        DB.limit(20)
      ]);
      if (!notifs.length) {
        listEl.innerHTML = '<div style="padding:40px 20px;text-align:center;color:var(--text-tertiary);font-size:var(--font-size-sm)">No notifications yet</div>';
        return;
      }
      listEl.innerHTML = notifs.map(n => `
        <div class="notification-item" style="padding:12px 20px;border-bottom:1px solid var(--border-light);cursor:pointer;display:flex;gap:12px;align-items:flex-start;transition:background 0.15s" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background='transparent'">
          <div style="width:36px;height:36px;border-radius:50%;background:${n.type === 'warning' ? 'rgba(245,158,11,0.1)' : n.type === 'danger' ? 'rgba(239,68,68,0.1)' : 'rgba(37,99,235,0.1)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">${n.type === 'warning' ? '&#9888;' : n.type === 'danger' ? '&#10006;' : '&#128276;'}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:var(--font-size-sm);font-weight:var(--font-medium);margin-bottom:2px">${Utils.escapeHtml(n.title || '')}</div>
            <div style="font-size:var(--font-size-xs);color:var(--text-secondary)">${Utils.escapeHtml(n.message || '')}</div>
            <div style="font-size:11px;color:var(--text-tertiary);margin-top:4px">${Utils.formatDateTime(n.createdAt)}</div>
          </div>
        </div>
      `).join('');
    } catch (e) {
      listEl.innerHTML = '<div style="padding:40px 20px;text-align:center;color:var(--danger);font-size:var(--font-size-sm)">Failed to load</div>';
    }
  },

  async markAllRead() {
    Toast.info('Notifications', 'All notifications marked as read');
  },

  async send(title, message, type = 'info', target = 'all') {
    await DB.add('notifications', { title, message, type, target, read: false });
  }
};
