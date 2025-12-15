class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('appTheme') || 'light';
    this.themes = {
      light: {
        name: 'light',
        label: 'Light Mode',
        icon: '☀️',
        colors: {
          primary: '#2563eb',
          background: '#f8fafc',
          text: '#0f172a',
        },
      },
      dark: {
        name: 'dark',
        label: 'Dark Mode',
        icon: '🌙',
        colors: {
          primary: '#3b82f6',
          background: '#1e293b',
          text: '#f8fafc',
        },
      },
    };
  }

  initialize() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('appTheme');

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('appTheme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    if (this.themes[theme]) {
      this.currentTheme = theme;
      localStorage.setItem('appTheme', theme);
      this.applyTheme();
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  applyTheme() {
    if (this.currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getThemeData(theme = this.currentTheme) {
    return this.themes[theme] || this.themes.light;
  }
}

const themeManager = new ThemeManager();

export default themeManager;
