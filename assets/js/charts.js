const Charts = {
  _instances: {},

  create(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded');
      return null;
    }
    if (this._instances[canvasId]) {
      this._instances[canvasId].destroy();
    }
    this._instances[canvasId] = new Chart(ctx, config);
    return this._instances[canvasId];
  },

  destroy(canvasId) {
    if (this._instances[canvasId]) {
      this._instances[canvasId].destroy();
      delete this._instances[canvasId];
    }
  },

  destroyAll() {
    Object.keys(this._instances).forEach(id => this.destroy(id));
  },

  getDefaults() {
    const isDark = Theme.current() === 'dark';
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: isDark ? '#F1F5F9' : '#1E293B', font: { family: 'Poppins', size: 12 } }
        }
      },
      scales: {
        x: { ticks: { color: isDark ? '#94A3B8' : '#64748B', font: { family: 'Poppins', size: 11 } }, grid: { color: isDark ? '#334155' : '#F1F5F9' } },
        y: { ticks: { color: isDark ? '#94A3B8' : '#64748B', font: { family: 'Poppins', size: 11 } }, grid: { color: isDark ? '#334155' : '#F1F5F9' } }
      }
    };
  },

  doughnutDefaults() {
    const isDark = Theme.current() === 'dark';
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: isDark ? '#F1F5F9' : '#1E293B', font: { family: 'Poppins', size: 12 }, padding: 16, usePointStyle: true } }
      },
      cutout: '70%'
    };
  },

  attendanceChart(canvasId, present, absent, late) {
    return this.create(canvasId, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [{
          data: [present, absent, late],
          backgroundColor: ['#22C55E', '#EF4444', '#F59E0B'],
          borderWidth: 0,
          borderRadius: 4
        }]
      },
      options: this.doughnutDefaults()
    });
  },

  monthlyAttendanceChart(canvasId, labels, data) {
    return this.create(canvasId, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Attendance %',
          data,
          backgroundColor: 'rgba(37, 99, 235, 0.8)',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: { ...this.getDefaults(), plugins: { legend: { display: false } } }
    });
  },

  studentPerformanceChart(canvasId, labels, scores) {
    return this.create(canvasId, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Marks',
          data: scores,
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2563EB',
          pointRadius: 4
        }]
      },
      options: this.getDefaults()
    });
  },

  departmentStatsChart(canvasId, labels, data) {
    return this.create(canvasId, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Students',
          data,
          backgroundColor: ['#2563EB', '#06B6D4', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: { ...this.getDefaults(), indexAxis: 'y' }
    });
  },

  genderDistributionChart(canvasId, male, female) {
    return this.create(canvasId, {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          data: [male, female],
          backgroundColor: ['#2563EB', '#EC4899'],
          borderWidth: 0,
          borderRadius: 4
        }]
      },
      options: this.doughnutDefaults()
    });
  },

  pieChart(canvasId, labels, data, colors) {
    return this.create(canvasId, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors || ['#2563EB', '#06B6D4', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Poppins' }, padding: 16, usePointStyle: true } }
        }
      }
    });
  }
};
