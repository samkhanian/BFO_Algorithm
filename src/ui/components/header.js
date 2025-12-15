const headerHTML = `
<nav class="navbar">
  <div class="navbar__container container flex-between">
    <div class="navbar__logo">
      <a href="/">
        <i class="fas fa-dna"></i>
        <span>BFO Lab</span>
      </a>
    </div>

    <button class="navbar__toggle" id="navbarToggle" aria-label="Toggle navigation menu">
      <i class="fas fa-bars"></i>
    </button>

    <ul class="navbar__menu" id="navbarMenu">
      <li class="navbar__item">
        <a href="/" class="navbar__link" data-page="home">
          <i class="fas fa-home"></i>
          <span data-i18n="nav.home">خانه</span>
        </a>
      </li>
      <li class="navbar__item">
        <a href="education.html" class="navbar__link" data-page="education">
          <i class="fas fa-book"></i>
          <span data-i18n="nav.education">آموزش</span>
        </a>
      </li>
      <li class="navbar__item">
        <a href="laboratory.html" class="navbar__link" data-page="laboratory">
          <i class="fas fa-flask"></i>
          <span data-i18n="nav.laboratory">آزمایشگاه</span>
        </a>
      </li>
      <li class="navbar__item">
        <a href="about.html" class="navbar__link" data-page="about">
          <i class="fas fa-circle-info"></i>
          <span data-i18n="nav.about">درباره</span>
        </a>
      </li>
      <li class="navbar__item navbar__divider"></li>
      <li class="navbar__item">
        <button class="navbar__theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <i class="fas fa-moon"></i>
          <span id="themeLabel"></span>
        </button>
      </li>
      <li class="navbar__item">
        <button class="navbar__lang-toggle" id="langToggle" aria-label="Toggle language">
          <i class="fas fa-globe"></i>
          <span data-i18n="nav.language">EN</span>
        </button>
      </li>
    </ul>
  </div>
</nav>
`;

export function initializeHeader(currentPage = 'home') {
  const headerElement = document.createElement('div');
  headerElement.innerHTML = headerHTML;
  document.body.insertBefore(headerElement.firstElementChild, document.body.firstChild);

  setTimeout(() => {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const themeLabel = document.getElementById('themeLabel');

    if (!themeToggle) {
      console.error('Theme toggle button not found!');
      return;
    }

    const updateThemeLabel = () => {
      if (!themeLabel) return;
      const isDark = document.body.classList.contains('dark-mode');
      themeLabel.textContent = isDark ? '☀️' : '🌙';
    };

    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      if (isDark) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('appTheme', 'light');
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('appTheme', 'dark');
      }
      updateThemeLabel();
    });

    if (langToggle) {
      langToggle.addEventListener('click', () => {
        const currentLang = localStorage.getItem('appLanguage') || 'fa';
        const newLang = currentLang === 'fa' ? 'en' : 'fa';
        localStorage.setItem('appLanguage', newLang);
        location.reload();
      });
    }

    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
      });

      const navLinks = navbarMenu.querySelectorAll('.navbar__link');
      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          navbarMenu.classList.remove('active');
        });
      });
    }

    const navItems = document.querySelectorAll('[data-page]');
    navItems.forEach((item) => {
      item.classList.remove('active');
      if (item.dataset.page === currentPage) {
        item.classList.add('active');
      }
    });

    updateThemeLabel();
  }, 50);
}

export { headerHTML };
