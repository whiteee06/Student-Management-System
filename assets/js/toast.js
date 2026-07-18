const Toast = {
  _container: null,

  _init() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = 'toast-container';
      document.body.appendChild(this._container);
    }
  },

  show(options) {
    this._init();
    const { type = 'info', title, message, duration = 4000 } = options;
    const icons = { success: '&#10004;', error: '&#10006;', warning: '&#9888;', info: '&#8505;' };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <span class="toast-close" onclick="this.closest('.toast').remove()">&#10005;</span>
    `;

    this._container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(title, message) { this.show({ type: 'success', title, message }); },
  error(title, message) { this.show({ type: 'error', title, message }); },
  warning(title, message) { this.show({ type: 'warning', title, message }); },
  info(title, message) { this.show({ type: 'info', title, message }); }
};
