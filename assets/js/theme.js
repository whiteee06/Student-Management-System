const Theme = {
  _key: 'sms-theme',

  init() {
    const saved = localStorage.getItem(this._key) || 'light';
    this.apply(saved);
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this._key, theme);
    this._updateToggle(theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    return next;
  },

  current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  _updateToggle(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
      btn.setAttribute('data-tooltip', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
};
