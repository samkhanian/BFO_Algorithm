/**
 * Application Configuration & Entry Point
 * مدیریت راه‌اندازی و پیکربندی اصلی اپلیکیشن
 */

const APP_CONFIG = {
  name: 'BFO Educational Platform',
  version: '1.0.0',
  language: localStorage.getItem('appLanguage') || 'fa',
  theme: localStorage.getItem('appTheme') || 'light',
  debug: false,
};

const LANGUAGES = {
  fa: { name: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  en: { name: 'English', dir: 'ltr', flag: '🇺🇸' },
};

/**
 * Initialize language and theme
 * راه‌اندازی زبان و تم
 */
function initializeApp() {
  // Set language
  const html = document.documentElement;
  html.lang = APP_CONFIG.language;
  html.dir = LANGUAGES[APP_CONFIG.language].dir;

  // Set theme
  if (APP_CONFIG.theme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Initialize event listeners
  initializeNavigation();
  initializeLanguageToggle();
  initializeHeroAnimation();
  initializeCounters();
}

/**
 * Initialize navigation
 * راه‌اندازی ناویگیشن
 */
function initializeNavigation() {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    const navLinks = navbarMenu.querySelectorAll('.navbar__link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
      });
    });
  }

  // Set active nav item
  const currentPage = getCurrentPage();
  const navItems = document.querySelectorAll('[data-page]');
  navItems.forEach((item) => {
    item.classList.remove('active');
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
    }
  });
}

/**
 * Get current page from URL
 * دریافت صفحه فعلی از URL
 */
function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('education')) return 'education';
  if (path.includes('laboratory')) return 'laboratory';
  if (path.includes('about')) return 'about';
  return 'home';
}

/**
 * Initialize language toggle
 * راه‌اندازی تبدیل زبان
 */
function initializeLanguageToggle() {
  const langToggle = document.getElementById('langToggle');

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      APP_CONFIG.language = APP_CONFIG.language === 'fa' ? 'en' : 'fa';
      localStorage.setItem('appLanguage', APP_CONFIG.language);

      const html = document.documentElement;
      html.lang = APP_CONFIG.language;
      html.dir = LANGUAGES[APP_CONFIG.language].dir;

      // Update button text
      langToggle.textContent =
        APP_CONFIG.language === 'fa' ? 'EN' : 'فا';

      // Reload page or update content
      location.reload();
    });

    // Set initial text
    langToggle.innerHTML = `<i class="fas fa-globe"></i><span>${
      APP_CONFIG.language === 'fa' ? 'EN' : 'فا'
    }</span>`;
  }
}

/**
 * Hero Animation
 * انیمیشن صفحه اول
 */
function initializeHeroAnimation() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const heroSection = document.getElementById('hero');

  // Set canvas size to match container
  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Animate bacteria-like particles
  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Wrap around
      this.x = (this.x + canvas.width) % canvas.width;
      this.y = (this.y + canvas.height) % canvas.height;
    }

    draw(ctx) {
      ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Counter animation for stats section
 * انیمیشن شمارنده برای بخش آمار
 */
function initializeCounters() {
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.dataset.count);
        animateCounter(target, count);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

/**
 * Animate counter from 0 to target value
 * انیمیشن شمارنده از 0 تا مقدار هدف
 */
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const interval = 30;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, interval);
}

/**
 * Initialize Education Page
 * راه‌اندازی صفحه آموزش
 */
function initializeEducationPage() {
  if (getCurrentPage() !== 'education') return;

  const lessonsList = document.getElementById('lessonsList');
  const lessonContent = document.getElementById('lessonContent');
  const lessonTitle = document.getElementById('lessonTitle');
  const lessonSubtitle = document.getElementById('lessonSubtitle');
  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');
  const progressFill = document.getElementById('progressFill');
  const progressPercent = document.getElementById('progressPercent');
  const lessonCounter = document.getElementById('lessonCounter');

  let currentLessonIndex = 0;
  const lessons = [
    'intro',
    'bacteria',
    'chemotaxis',
    'algorithm',
    'tsp',
    'comparison',
  ];

  // Load lesson content
  function loadLesson(index) {
    currentLessonIndex = index;

    // Update UI
    const percent = ((index + 1) / lessons.length) * 100;
    progressFill.style.width = percent + '%';
    progressPercent.textContent = Math.round(percent) + '%';
    lessonCounter.textContent = `${index + 1} / ${lessons.length}`;

    // Update active lesson button
    document.querySelectorAll('.lessons-nav__link').forEach((btn) => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-lesson="${lessons[index]}"]`).classList.add('active');

    // Placeholder content
    lessonTitle.textContent = ['درآمدی و تاریخچه', 'رفتار باکتری', 'شیمی‌جویی', 'مراحل الگوریتم', 'مسئله TSP', 'مقایسه الگوریتم‌ها'][index];
    lessonSubtitle.textContent = [
      'تاریخچه الگوریتم‌های الهام‌گرفته از طبیعت',
      'فهم رفتار E. coli و حرکت باکتری‌ها',
      'درس شیمی‌جویی و تغییر جهت',
      'چهار مرحله اصلی الگوریتم BFO',
      'مسئله فروشنده دوره‌گرد و کاربردها',
      'مقایسه BFO با GA، PSO و سایر الگوریتم‌ها',
    ][index];

    lessonContent.innerHTML = `
      <div class="lesson-placeholder">
        <i class="fas fa-book"></i>
        <p>درحال بارگذاری درس: ${lessonTitle.textContent}</p>
        <p class="text-muted text-sm">محتوای تفصیلی بزودی اضافه خواهد شد</p>
      </div>
    `;

    // Update button states
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === lessons.length - 1;
  }

  // Event listeners
  if (lessonsList) {
    lessonsList.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lessonIndex = lessons.indexOf(btn.dataset.lesson);
        loadLesson(lessonIndex);
      });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentLessonIndex > 0) {
        loadLesson(currentLessonIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentLessonIndex < lessons.length - 1) {
        loadLesson(currentLessonIndex + 1);
      }
    });
  }

  // Load first lesson
  loadLesson(0);
}

/**
 * Initialize Laboratory Page
 * راه‌اندازی صفحه آزمایشگاه
 */
function initializeLaboratoryPage() {
  if (getCurrentPage() !== 'laboratory') return;

  // Initialize scenario selection
  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  scenarioBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Initialize parameter updates
  const paramInputs = document.querySelectorAll('.parameters-form .input-range');
  paramInputs.forEach((input) => {
    const display = document.getElementById(input.id + 'Display');
    if (display) {
      input.addEventListener('input', () => {
        display.textContent = input.value;
      });
    }
  });

  // Initialize tab switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;

      // Remove active class from all
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      // Add active class to clicked
      btn.classList.add('active');
      document.getElementById(tabName + 'Tab')?.classList.add('active');
    });
  });

  // Initialize placeholder canvas
  const canvas = document.getElementById('warehouseCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw placeholder
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      'Canvas برای شبیه‌سازی انبار',
      canvas.width / 2,
      canvas.height / 2 - 10
    );
    ctx.fillText(
      'محتوای تفصیلی بزودی اضافه خواهد شد',
      canvas.width / 2,
      canvas.height / 2 + 20
    );
  }
}

/**
 * Main Initialization
 * راه‌اندازی اصلی
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initializeEducationPage();
  initializeLaboratoryPage();

  if (APP_CONFIG.debug) {
    console.log('App Configuration:', APP_CONFIG);
    console.log('Current Language:', APP_CONFIG.language);
    console.log('Current Page:', getCurrentPage());
  }
});

export { APP_CONFIG, LANGUAGES };
