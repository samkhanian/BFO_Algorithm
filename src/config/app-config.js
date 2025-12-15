import i18n from './i18n.js';
import { initializeHeader } from '../ui/components/header.js';
import { initializeFooter } from '../ui/components/footer.js';
import educationManagerExport, { loadLessonContent } from '../ui/managers/education.manager.js';
import { initializeLaboratorySimulation } from '../ui/managers/laboratory.manager.js';

const educationManager = educationManagerExport.educationManager;

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
  i18n.setLanguage(APP_CONFIG.language);
  i18n.updatePageLanguage();

  const currentPage = getCurrentPage();
  initializeHeader(currentPage);
  initializeFooter();

  setTimeout(() => {
    i18n.updateAllTranslations();
  }, 100);

  initializeHeroAnimation();
  initializeCounters();
  initializeEducationPage();
  initializeLaboratoryPage();

  if (APP_CONFIG.debug) {
    console.log('App Configuration:', APP_CONFIG);
    console.log('Current Language:', APP_CONFIG.language);
    console.log('Current Theme:', localStorage.getItem('appTheme'));
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

    const lessonData = loadLessonContent(lessons[index]);
    lessonTitle.textContent = lessonData.title;
    lessonSubtitle.textContent = lessonData.subtitle;
    lessonContent.innerHTML = lessonData.content;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === lessons.length - 1;

    educationManager.initializeVisualizers(lessons[index]);
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

  let labSimulation = null;
  let simulationInterval = null;

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
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const startSimBtn = document.getElementById('startSimBtn');
    const pauseSimBtn = document.getElementById('pauseSimBtn');
    const resetSimBtn = document.getElementById('resetSimBtn');

    const getSimulationParams = () => ({
      bacteriaCount: parseInt(document.getElementById('bacteriaCount').value),
      chemoSteps: parseInt(document.getElementById('chemoSteps').value),
      reproFreq: parseInt(document.getElementById('reproFreq').value),
      edProb: parseFloat(document.getElementById('edProb').value)
    });

    labSimulation = initializeLaboratorySimulation(canvas, getSimulationParams());
    labSimulation.simulation.draw();

    if (startSimBtn) {
      startSimBtn.addEventListener('click', () => {
        if (!labSimulation.simulation.running) {
          labSimulation.simulation.running = true;
          startSimBtn.disabled = true;
          pauseSimBtn.disabled = false;

          simulationInterval = setInterval(() => {
            if (labSimulation.simulation.running) {
              labSimulation.simulation.step();
              labSimulation.simulation.draw();
              updateStatistics();
            }
          }, 50);
        }
      });
    }

    if (pauseSimBtn) {
      pauseSimBtn.disabled = true;
      pauseSimBtn.addEventListener('click', () => {
        labSimulation.simulation.running = false;
        startSimBtn.disabled = false;
        pauseSimBtn.disabled = true;
        if (simulationInterval) {
          clearInterval(simulationInterval);
        }
      });
    }

    if (resetSimBtn) {
      resetSimBtn.addEventListener('click', () => {
        if (simulationInterval) {
          clearInterval(simulationInterval);
        }
        labSimulation.resetSimulation();
        startSimBtn.disabled = false;
        pauseSimBtn.disabled = true;
        labSimulation.simulation.draw();
        updateStatistics();
      });
    }

    const updateStatistics = () => {
      const stats = labSimulation.getStatistics();
      const stepCount = document.getElementById('stepCount');
      const bestFitness = document.getElementById('bestFitness');
      const improvementPercent = document.getElementById('improvementPercent');

      if (stepCount) stepCount.textContent = stats.iterations;
      if (bestFitness) bestFitness.textContent = stats.bestFitness;
      if (improvementPercent) improvementPercent.textContent = stats.improvement + '%';
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

export { APP_CONFIG, LANGUAGES };
