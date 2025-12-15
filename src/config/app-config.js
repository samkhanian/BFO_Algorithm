import i18n from './i18n.js';
import themeManager from './theme.js';
import { initializeHeader } from '../ui/components/header.js';
import { initializeFooter } from '../ui/components/footer.js';

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

function initializeApp() {
  themeManager.initialize();
  
  i18n.setLanguage(APP_CONFIG.language);
  i18n.updatePageLanguage();

  const currentPage = getCurrentPage();
  initializeHeader(currentPage);
  initializeFooter();

  i18n.updateAllTranslations();

  initializeHeroAnimation();
  initializeCounters();
  initializeEducationPage();
  initializeLaboratoryPage();

  if (APP_CONFIG.debug) {
    console.log('App Configuration:', APP_CONFIG);
    console.log('Current Language:', APP_CONFIG.language);
    console.log('Current Theme:', themeManager.getTheme());
    console.log('Current Page:', currentPage);
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('education')) return 'education';
  if (path.includes('laboratory')) return 'laboratory';
  if (path.includes('about')) return 'about';
  return 'home';
}

function initializeHeroAnimation() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const heroSection = document.getElementById('hero');

  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

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

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

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

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

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
  const lessons = ['intro', 'bacteria', 'chemotaxis', 'algorithm', 'tsp', 'comparison'];

  const lessonTitles = {
    fa: [
      i18n.t('education.intro'),
      i18n.t('education.bacteria'),
      i18n.t('education.chemotaxis'),
      i18n.t('education.algorithm'),
      i18n.t('education.tsp'),
      i18n.t('education.comparison'),
    ],
    en: [
      i18n.t('education.intro'),
      i18n.t('education.bacteria'),
      i18n.t('education.chemotaxis'),
      i18n.t('education.algorithm'),
      i18n.t('education.tsp'),
      i18n.t('education.comparison'),
    ],
  };

  const lessonSubtitles = {
    fa: [
      i18n.t('education.introSubtitle'),
      i18n.t('education.bacteriaSubtitle'),
      i18n.t('education.chemotaxisSubtitle'),
      i18n.t('education.algorithmSubtitle'),
      i18n.t('education.tspSubtitle'),
      i18n.t('education.comparisonSubtitle'),
    ],
    en: [
      i18n.t('education.introSubtitle'),
      i18n.t('education.bacteriaSubtitle'),
      i18n.t('education.chemotaxisSubtitle'),
      i18n.t('education.algorithmSubtitle'),
      i18n.t('education.tspSubtitle'),
      i18n.t('education.comparisonSubtitle'),
    ],
  };

  function loadLesson(index) {
    currentLessonIndex = index;

    const percent = ((index + 1) / lessons.length) * 100;
    progressFill.style.width = percent + '%';
    progressPercent.textContent = Math.round(percent) + '%';
    lessonCounter.textContent = `${index + 1} / ${lessons.length}`;

    document.querySelectorAll('.lessons-nav__link').forEach((btn) => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-lesson="${lessons[index]}"]`).classList.add('active');

    const lang = i18n.getLanguage();
    lessonTitle.textContent = lessonTitles[lang][index];
    lessonSubtitle.textContent = lessonSubtitles[lang][index];

    lessonContent.innerHTML = `
      <div class="lesson-placeholder">
        <i class="fas fa-book"></i>
        <p>${i18n.t('education.loading')} ${lessonTitle.textContent}</p>
        <p class="text-muted text-sm">${i18n.t('education.detailedContent')}</p>
      </div>
    `;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === lessons.length - 1;
  }

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

  loadLesson(0);
}

function initializeLaboratoryPage() {
  if (getCurrentPage() !== 'laboratory') return;

  const scenarioBtns = document.querySelectorAll('.scenario-btn');
  scenarioBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      scenarioBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const paramInputs = document.querySelectorAll('.parameters-form .input-range');
  paramInputs.forEach((input) => {
    const display = document.getElementById(input.id + 'Display');
    if (display) {
      input.addEventListener('input', () => {
        display.textContent = input.value;
      });
    }
  });

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabName + 'Tab')?.classList.add('active');
    });
  });

  const canvas = document.getElementById('warehouseCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(i18n.t('laboratory.warehouseCanvas'), canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText(
      i18n.t('education.detailedContent'),
      canvas.width / 2,
      canvas.height / 2 + 20
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

export { APP_CONFIG, LANGUAGES };
