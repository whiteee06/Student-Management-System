const BASE_URL = (function() {
  const path = window.location.pathname;
  const first = path.split('/').filter(Boolean)[0] || '';
  if (first === 'Student-Management-System' || first === 'dashboard' || first === 'assets') {
    return first === 'dashboard' || first === 'assets' ? '' : '/' + first;
  }
  return '';
})();

const Utils = {
  formatDate(date) {
    if (!date) return 'N/A';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  },

  formatDateTime(date) {
    if (!date) return 'N/A';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  },

  formatTime(date) {
    if (!date) return 'N/A';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  },

  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },

  calculateAge(dob) {
    if (!dob) return null;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  },

  calculatePercentage(present, total) {
    if (!total) return 0;
    return Math.round((present / total) * 100);
  },

  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  truncate(str, len = 50) {
    if (!str || str.length <= len) return str;
    return str.substring(0, len) + '...';
  },

  getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  },

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  validatePhone(phone) {
    return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
  },

  validateRegisterNumber(regNo) {
    return /^[A-Z0-9\/\-]+$/.test(regNo);
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  sanitize(str) {
    return this.escapeHtml(str).trim();
  },

  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  },

  exportToCSV(data, filename) {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [headers.join(',')];
    data.forEach(row => {
      csv.push(headers.map(h => `"${(row[h] || '').toString().replace(/"/g, '""')}"`).join(','));
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },

  async exportToPDF(elementId, filename) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>${filename}</title>
      <style>body{font-family:Poppins,sans-serif;padding:20px}table{width:100%;border-collapse:collapse}th,td{padding:8px;border:1px solid #ddd;text-align:left}th{background:#2563EB;color:white}</style>
      </head><body>${el.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  },

  generateAttendanceReport(data) {
    return data.map(d => ({
      ...d,
      percentage: this.calculatePercentage(d.presentDays, d.totalDays) + '%'
    }));
  },

  showModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
  },

  hideModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
  },

  showLoading(containerId) {
    const el = document.getElementById(containerId);
    if (el) {
      el.innerHTML = `
        <div class="flex items-center justify-center" style="padding:40px">
          <div style="width:40px;height:40px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite"></div>
        </div>
      `;
    }
  },

  animateCount(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start).toLocaleString();
      }
    }, 16);
  },

  observeAndAnimate(selector) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }
};
