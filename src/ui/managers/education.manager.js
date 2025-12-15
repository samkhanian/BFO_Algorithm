import i18n from '../../config/i18n.js';
import BacterialVisualizer from './bacterial-visualizer.js';
import BehaviorVisualizer from './behavior-visualizer.js';

const lessonContents = {
  fa: {
    intro: {
      title: 'درآمدی و تاریخچه',
      subtitle: 'تاریخچه الگوریتم‌های الهام‌گرفته از طبیعت',
      content: `
        <div class="lesson-section">
          <h3>مقدمه</h3>
          <p>
            الگوریتم‌های الهام‌گرفته از طبیعت (Nature-Inspired Algorithms) یکی از زمینه‌های جالب تحقیق در علم کامپیوتر هستند.
            این الگوریتم‌ها از روند‌های طبیعی و رفتار موجودات زنده الهام می‌گیرند.
          </p>
        </div>

        <div class="lesson-section">
          <h3>تاریخچه BFO</h3>
          <p>
            الگوریتم جستجوی باکتریایی (Bacterial Foraging Optimization - BFO) توسط Kevin M. Passino در سال 2002 معرفی شد.
            این الگوریتم از رفتار سلولی باکتری E. coli الهام می‌گیرد.
          </p>
          <ul>
            <li><strong>سال معرفی:</strong> 2002</li>
            <li><strong>معرّف:</strong> Kevin M. Passino</li>
            <li><strong>منبع الهام:</strong> رفتار E. coli</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>چرا BFO مهم است؟</h3>
          <p>
            BFO یک الگوریتم قدرتمند برای حل مسائل بهینه‌سازی است که می‌تواند:
          </p>
          <ul>
            <li>مسائل غیرخطی پیچیده را حل کند</li>
            <li>در جستجوی فضای حالت بزرگ کارآمد باشد</li>
            <li>از تله‌های محلی فرار کند</li>
            <li>در محیط‌های پویا کار کند</li>
          </ul>
        </div>
      `
    },
    bacteria: {
      title: 'رفتار باکتری',
      subtitle: 'فهم رفتار E. coli و حرکت باکتری‌ها',
      content: `
        <div class="lesson-section">
          <h3>E. coli چیست؟</h3>
          <p>
            Escherichia coli (E. coli) یک باکتری یکسلولی است که در روده انسان زندگی می‌کند.
            این باکتری برای یافتن مواد غذایی مناسب در محیط خود حرکت می‌کند.
          </p>
        </div>

        <div class="lesson-section">
          <h3>رفتار حرکتی</h3>
          <p>
            باکتری E. coli دو نوع حرکت دارد:
          </p>
          <ul>
            <li><strong>Run (حرکت مستقیم):</strong> حرکت تصادفی در جهت ثابت</li>
            <li><strong>Tumble (چرخش):</strong> تغییر تصادفی جهت حرکت</li>
          </ul>
          
          <div class="lesson-canvas-container" id="bacteriaMotionCanvas"></div>
          <div class="canvas-controls">
            <button class="btn btn--sm btn--primary" id="startMotionBtn">
              <i class="fas fa-play"></i> شروع
            </button>
            <button class="btn btn--sm btn--outline" id="stopMotionBtn" disabled>
              <i class="fas fa-pause"></i> توقف
            </button>
            <button class="btn btn--sm btn--outline" id="resetMotionBtn">
              <i class="fas fa-redo"></i> تازه‌سازی
            </button>
          </div>
        </div>

        <div class="lesson-section">
          <h3>شیمی‌جویی</h3>
          <p>
            باکتری‌ها می‌توانند غلظت مواد شیمیایی را اندازه‌گیری کنند و بر اساس آن تصمیم می‌گیرند که:
          </p>
          <ul>
            <li>آیا به حرکت ادامه دهند یا جهت را تغییر دهند</li>
            <li>کدام جهت بهتر است</li>
            <li>چقدر سریع حرکت کنند</li>
          </ul>
        </div>
      `
    },
    chemotaxis: {
      title: 'شیمی‌جویی',
      subtitle: 'درس شیمی‌جویی و تغییر جهت',
      content: `
        <div class="lesson-section">
          <h3>تعریف شیمی‌جویی</h3>
          <p>
            شیمی‌جویی (Chemotaxis) توانایی موجود زنده برای شناسایی و حرکت به سمت یا از یک مادۀ شیمیایی است.
          </p>
        </div>

        <div class="lesson-section">
          <h3>مراحل شیمی‌جویی</h3>
          <ol>
            <li><strong>شناسایی:</strong> سنسورهای باکتری موادِ غذایی یا سمی را تشخیص می‌دهند</li>
            <li><strong>مقایسه:</strong> اندازه‌گیری تغییرات غلظت</li>
            <li><strong>تصمیم:</strong> تعیین حرکت بهتر</li>
            <li><strong>حرکت:</strong> انجام حرکت یا چرخش</li>
          </ol>
          
          <div class="lesson-canvas-container" id="chemotaxisCanvas"></div>
          <div class="canvas-controls">
            <button class="btn btn--sm btn--primary" id="startChemotaxisBtn">
              <i class="fas fa-play"></i> شروع انیمیشن
            </button>
            <button class="btn btn--sm btn--outline" id="stopChemotaxisBtn">
              <i class="fas fa-pause"></i> توقف
            </button>
          </div>
        </div>

        <div class="lesson-section">
          <h3>مدل ریاضی</h3>
          <p>
            موقعیت جدید باکتری با فرمول زیر محاسبه می‌شود:
          </p>
          <code>θ(i+1, j, k) = θ(i, j, k) + C(i) × Δ(i)</code>
          <p>
            که در آن:
          </p>
          <ul>
            <li>θ: موقعیت باکتری</li>
            <li>C: اندازه مرحله</li>
            <li>Δ: جهت حرکت</li>
          </ul>
        </div>
      `
    },
    algorithm: {
      title: 'مراحل الگوریتم',
      subtitle: 'چهار مرحله اصلی الگوریتم BFO',
      content: `
        <div class="lesson-section">
          <h3>چهار مرحله اصلی BFO</h3>
          <p>الگوریتم BFO شامل چهار عملیات بیولوژیکی است:</p>
          
          <div class="lesson-canvas-container" id="algorithmStepsCanvas"></div>
          <div class="canvas-controls">
            <button class="btn btn--sm btn--outline" id="prevStepBtn">
              <i class="fas fa-arrow-right"></i> قبلی
            </button>
            <button class="btn btn--sm btn--primary" id="startStepsBtn">
              <i class="fas fa-play"></i> شروع اتوماتیک
            </button>
            <button class="btn btn--sm btn--outline" id="nextStepBtn">
              بعدی <i class="fas fa-arrow-left"></i>
            </button>
          </div>
        </div>

        <div class="lesson-section">
          <h4>1. شیمی‌جویی (Chemotaxis)</h4>
          <p>
            هر باکتری یک مسیر را تکرار می‌کند که شامل مراحل Run و Tumble است.
            اگر غلظت مادۀ غذایی افزایش پیدا کند، باکتری به حرکت ادامه می‌دهد.
            در غیر این صورت، جهت را تغییر می‌دهد.
          </p>
        </div>

        <div class="lesson-section">
          <h4>2. سواریدگی (Swarming)</h4>
          <p>
            باکتری‌های موفق (با بیشترین غذا) سیگنال‌های جاذب‌کننده (مادۀ شیمیایی) تولید می‌کنند.
            این باعث می‌شود باکتری‌های دیگر به سمت این مناطق حرکت کنند.
          </p>
        </div>

        <div class="lesson-section">
          <h4>3. تکثیر (Reproduction)</h4>
          <p>
            بعد از Nc مرحلۀ شیمی‌جویی، باکتری‌هایی که بیشترین غذا جمع‌آوری کرده‌اند تقسیم می‌شوند.
            این موجب ایجاد نسلی جدید می‌شود که از بهترین موقعیت‌ها شروع می‌کند.
          </p>
        </div>

        <div class="lesson-section">
          <h4>4. حذف و پراکندگی (Elimination & Dispersal)</h4>
          <p>
            با احتمال Ped، بعضی از باکتری‌ها به‌طور تصادفی حذف می‌شوند یا در نقاط تصادفی جدیدی قرار می‌گیرند.
            این روند موجب تنوع جمعیت و اجتناب از تله‌های محلی می‌شود.
          </p>
        </div>
      `
    },
    tsp: {
      title: 'مسئله TSP',
      subtitle: 'مسئله فروشنده دوره‌گرد و کاربردها',
      content: `
        <div class="lesson-section">
          <h3>مسئله فروشنده دوره‌گرد (TSP)</h3>
          <p>
            مسئله TSP (Traveling Salesman Problem) یکی از معروف‌ترین مسائل بهینه‌سازی است.
          </p>
        </div>

        <div class="lesson-section">
          <h3>تعریف مسئله</h3>
          <p>
            فروشنده باید n شهر را بازدید کند به‌طوری که:
          </p>
          <ul>
            <li>هر شهر دقیقاً یک بار بازدید شود</li>
            <li>به نقطۀ آغاز برگردد</li>
            <li>مسافت کل کمینه باشد</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>چالش‌ها</h3>
          <ul>
            <li><strong>پیچیدگی:</strong> مسئلۀ NP-Hard</li>
            <li><strong>حجم فضای جستجو:</strong> (n-1)!/2</li>
            <li><strong>غیر‌ممکن بودن جستجوی جامع:</strong> برای n بزرگ</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>کاربردهای BFO برای TSP</h3>
          <ul>
            <li>یافتن راه‌حل‌های تقریبی سریع</li>
            <li>بهتر بودن نسبت به روش‌های کلاسیک</li>
            <li>سازگاری با محیط‌های متغیر</li>
          </ul>
        </div>
      `
    },
    comparison: {
      title: 'مقایسه الگوریتم‌ها',
      subtitle: 'مقایسه BFO با GA، PSO و سایر الگوریتم‌ها',
      content: `
        <div class="lesson-section">
          <h3>الگوریتم‌های الهام‌گرفته از طبیعت</h3>
          <p>
            چندین الگوریتم برای حل مسائل بهینه‌سازی وجود دارد:
          </p>
        </div>

        <div class="lesson-section">
          <h3>Genetic Algorithm (GA)</h3>
          <ul>
            <li><strong>الهام:</strong> تکامل طبیعی</li>
            <li><strong>مزایا:</strong> ساده و موثر</li>
            <li><strong>معایب:</strong> تنوع محدود، هم‌گرایی سریع</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Particle Swarm Optimization (PSO)</h3>
          <ul>
            <li><strong>الهام:</strong> رفتار گله‌ای پرندگان</li>
            <li><strong>مزایا:</strong> سریع، پارامترهای کم</li>
            <li><strong>معایب:</strong> تله‌های محلی</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Bacterial Foraging Optimization (BFO)</h3>
          <ul>
            <li><strong>الهام:</strong> رفتار باکتری</li>
            <li><strong>مزایا:</strong> تنوع بالا، گریز از تله‌ها</li>
            <li><strong>معایب:</strong> پیچیده‌تر، محاسبات بیشتر</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>خلاصه مقایسه</h3>
          <table>
            <tr>
              <th>معیار</th>
              <th>GA</th>
              <th>PSO</th>
              <th>BFO</th>
            </tr>
            <tr>
              <td>سرعت</td>
              <td>متوسط</td>
              <td>سریع</td>
              <td>کند</td>
            </tr>
            <tr>
              <td>کیفیت راه‌حل</td>
              <td>خوب</td>
              <td>خوب</td>
              <td>بسیار خوب</td>
            </tr>
            <tr>
              <td>تنوع</td>
              <td>متوسط</td>
              <td>کم</td>
              <td>بالا</td>
            </tr>
          </table>
        </div>
      `
    }
  },
  en: {
    intro: {
      title: 'Introduction & History',
      subtitle: 'History of Nature-Inspired Algorithms',
      content: `
        <div class="lesson-section">
          <h3>Introduction</h3>
          <p>
            Nature-Inspired Algorithms are a fascinating field of research in computer science.
            These algorithms are inspired by natural processes and the behavior of living organisms.
          </p>
        </div>

        <div class="lesson-section">
          <h3>History of BFO</h3>
          <p>
            The Bacterial Foraging Optimization (BFO) algorithm was introduced by Kevin M. Passino in 2002.
            It is inspired by the cellular behavior of the bacteria E. coli.
          </p>
          <ul>
            <li><strong>Year of Introduction:</strong> 2002</li>
            <li><strong>Introduced by:</strong> Kevin M. Passino</li>
            <li><strong>Source of Inspiration:</strong> E. coli Behavior</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Why BFO is Important</h3>
          <p>
            BFO is a powerful algorithm for solving optimization problems that can:
          </p>
          <ul>
            <li>Solve complex non-linear problems</li>
            <li>Be efficient in large state space search</li>
            <li>Escape from local optima</li>
            <li>Work in dynamic environments</li>
          </ul>
        </div>
      `
    },
    bacteria: {
      title: 'Bacterial Behavior',
      subtitle: 'Understanding E. coli Behavior and Bacterial Movement',
      content: `
        <div class="lesson-section">
          <h3>What is E. coli?</h3>
          <p>
            Escherichia coli (E. coli) is a single-celled bacterium that lives in the human intestine.
            It moves to find suitable food sources in its environment.
          </p>
        </div>

        <div class="lesson-section">
          <h3>Movement Behavior</h3>
          <p>
            E. coli has two types of movement:
          </p>
          <ul>
            <li><strong>Run:</strong> Straight movement in a fixed direction</li>
            <li><strong>Tumble:</strong> Random change of movement direction</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Chemotaxis</h3>
          <p>
            Bacteria can measure the concentration of chemical substances and decide:
          </p>
          <ul>
            <li>Whether to continue moving or change direction</li>
            <li>Which direction is better</li>
            <li>How fast to move</li>
          </ul>
        </div>
      `
    },
    chemotaxis: {
      title: 'Chemotaxis',
      subtitle: 'Understanding Chemotaxis and Direction Change',
      content: `
        <div class="lesson-section">
          <h3>Definition of Chemotaxis</h3>
          <p>
            Chemotaxis is the ability of a living organism to sense and move towards or away from a chemical substance.
          </p>
        </div>

        <div class="lesson-section">
          <h3>Steps of Chemotaxis</h3>
          <ol>
            <li><strong>Detection:</strong> Bacterial sensors detect food or toxic substances</li>
            <li><strong>Comparison:</strong> Measuring concentration changes</li>
            <li><strong>Decision:</strong> Determining better movement</li>
            <li><strong>Movement:</strong> Performing movement or tumble</li>
          </ol>
        </div>

        <div class="lesson-section">
          <h3>Mathematical Model</h3>
          <p>
            The new position of a bacterium is calculated by:
          </p>
          <code>θ(i+1, j, k) = θ(i, j, k) + C(i) × Δ(i)</code>
          <p>
            Where:
          </p>
          <ul>
            <li>θ: Bacterium position</li>
            <li>C: Step size</li>
            <li>Δ: Movement direction</li>
          </ul>
        </div>
      `
    },
    algorithm: {
      title: 'Algorithm Steps',
      subtitle: 'The Four Main Steps of the BFO Algorithm',
      content: `
        <div class="lesson-section">
          <h3>Four Main Steps of BFO</h3>
          <p>The BFO algorithm consists of four biological operations:</p>
        </div>

        <div class="lesson-section">
          <h4>1. Chemotaxis</h4>
          <p>
            Each bacterium repeats a path consisting of Run and Tumble steps.
            If the concentration of food increases, the bacterium continues to move.
            Otherwise, it changes direction.
          </p>
        </div>

        <div class="lesson-section">
          <h4>2. Swarming</h4>
          <p>
            Successful bacteria (with the most food) produce attractant signals.
            This causes other bacteria to move towards these areas.
          </p>
        </div>

        <div class="lesson-section">
          <h4>3. Reproduction</h4>
          <p>
            After Nc chemotaxis steps, bacteria that have collected the most food divide.
            This creates a new generation starting from the best positions.
          </p>
        </div>

        <div class="lesson-section">
          <h4>4. Elimination & Dispersal</h4>
          <p>
            With probability Ped, some bacteria are randomly eliminated or placed at new random points.
            This process maintains population diversity and avoids local optima.
          </p>
        </div>
      `
    },
    tsp: {
      title: 'TSP Problem',
      subtitle: 'Traveling Salesman Problem and Applications',
      content: `
        <div class="lesson-section">
          <h3>Traveling Salesman Problem (TSP)</h3>
          <p>
            The TSP is one of the most famous optimization problems.
          </p>
        </div>

        <div class="lesson-section">
          <h3>Problem Definition</h3>
          <p>
            A salesman must visit n cities such that:
          </p>
          <ul>
            <li>Each city is visited exactly once</li>
            <li>Return to the starting point</li>
            <li>Total distance is minimized</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Challenges</h3>
          <ul>
            <li><strong>Complexity:</strong> NP-Hard problem</li>
            <li><strong>Search Space Size:</strong> (n-1)!/2</li>
            <li><strong>Computational Infeasibility:</strong> For large n</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>BFO Applications for TSP</h3>
          <ul>
            <li>Finding approximate solutions quickly</li>
            <li>Better than classical methods</li>
            <li>Adaptability to changing environments</li>
          </ul>
        </div>
      `
    },
    comparison: {
      title: 'Algorithm Comparison',
      subtitle: 'Comparing BFO with GA, PSO and Other Algorithms',
      content: `
        <div class="lesson-section">
          <h3>Nature-Inspired Algorithms</h3>
          <p>
            Several algorithms exist for solving optimization problems:
          </p>
        </div>

        <div class="lesson-section">
          <h3>Genetic Algorithm (GA)</h3>
          <ul>
            <li><strong>Inspiration:</strong> Natural evolution</li>
            <li><strong>Advantages:</strong> Simple and effective</li>
            <li><strong>Disadvantages:</strong> Limited diversity, fast convergence</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Particle Swarm Optimization (PSO)</h3>
          <ul>
            <li><strong>Inspiration:</strong> Bird flocking behavior</li>
            <li><strong>Advantages:</strong> Fast, few parameters</li>
            <li><strong>Disadvantages:</strong> Local optima</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Bacterial Foraging Optimization (BFO)</h3>
          <ul>
            <li><strong>Inspiration:</strong> Bacterial behavior</li>
            <li><strong>Advantages:</strong> High diversity, escapes local optima</li>
            <li><strong>Disadvantages:</strong> More complex, more computation</li>
          </ul>
        </div>

        <div class="lesson-section">
          <h3>Comparison Summary</h3>
          <table>
            <tr>
              <th>Criterion</th>
              <th>GA</th>
              <th>PSO</th>
              <th>BFO</th>
            </tr>
            <tr>
              <td>Speed</td>
              <td>Average</td>
              <td>Fast</td>
              <td>Slow</td>
            </tr>
            <tr>
              <td>Solution Quality</td>
              <td>Good</td>
              <td>Good</td>
              <td>Excellent</td>
            </tr>
            <tr>
              <td>Diversity</td>
              <td>Average</td>
              <td>Low</td>
              <td>High</td>
            </tr>
          </table>
        </div>
      `
    }
  }
};

export function loadLessonContent(lessonId) {
  const lang = i18n.getLanguage();
  const content = lessonContents[lang][lessonId];
  
  if (!content) {
    return {
      title: 'Not Found',
      subtitle: 'Lesson not found',
      content: '<p>This lesson is not available.</p>'
    };
  }

  return content;
}

class EducationManager {
  constructor() {
    this.bacterialVisualizer = null;
    this.behaviorVisualizer = null;
    this.currentLesson = 'intro';
  }

  initializeVisualizers(lessonId) {
    this.cleanupVisualizers();
    
    setTimeout(() => {
      if (lessonId === 'bacteria') {
        this.initBacteriaMotionViz();
      } else if (lessonId === 'chemotaxis') {
        this.initChemotaxisViz();
      } else if (lessonId === 'algorithm') {
        this.initAlgorithmStepsViz();
      }
    }, 100);
  }

  initBacteriaMotionViz() {
    const canvasContainer = document.getElementById('bacteriaMotionCanvas');
    if (!canvasContainer) return;

    const canvas = document.createElement('canvas');
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = 300;
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(canvas);

    this.bacterialVisualizer = new BacterialVisualizer(canvas);
    this.bacterialVisualizer.initBacteria(5);
    this.bacterialVisualizer.draw();

    const startBtn = document.getElementById('startMotionBtn');
    const stopBtn = document.getElementById('stopMotionBtn');
    const resetBtn = document.getElementById('resetMotionBtn');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.bacterialVisualizer.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        this.bacterialVisualizer.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.bacterialVisualizer.reset();
        this.bacterialVisualizer.start();
      });
    }
  }

  initChemotaxisViz() {
    const canvasContainer = document.getElementById('chemotaxisCanvas');
    if (!canvasContainer) return;

    const canvas = document.createElement('canvas');
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = 300;
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(canvas);

    this.behaviorVisualizer = new BehaviorVisualizer(canvas);
    this.behaviorVisualizer.showStep(0);

    const startBtn = document.getElementById('startChemotaxisBtn');
    const stopBtn = document.getElementById('stopChemotaxisBtn');

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.behaviorVisualizer.startAnimation();
        startBtn.disabled = true;
        stopBtn.disabled = false;
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        this.behaviorVisualizer.stopAnimation();
        startBtn.disabled = false;
        stopBtn.disabled = true;
      });
    }
  }

  initAlgorithmStepsViz() {
    const canvasContainer = document.getElementById('algorithmStepsCanvas');
    if (!canvasContainer) return;

    const canvas = document.createElement('canvas');
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = 350;
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(canvas);

    this.behaviorVisualizer = new BehaviorVisualizer(canvas);
    this.behaviorVisualizer.showStep(0);

    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const startBtn = document.getElementById('startStepsBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.behaviorVisualizer.stopAnimation();
        this.behaviorVisualizer.prevStep();
        startBtn.disabled = false;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.behaviorVisualizer.stopAnimation();
        this.behaviorVisualizer.nextStep();
        startBtn.disabled = false;
      });
    }

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.behaviorVisualizer.startAnimation();
        startBtn.disabled = true;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
      });
    }

    const observer = new MutationObserver(() => {
      if (!canvasContainer.contains(canvas)) {
        this.cleanupVisualizers();
      }
    });

    observer.observe(canvasContainer.parentElement, { childList: true, subtree: true });
  }

  cleanupVisualizers() {
    if (this.bacterialVisualizer) {
      this.bacterialVisualizer.stop();
      this.bacterialVisualizer = null;
    }

    if (this.behaviorVisualizer) {
      this.behaviorVisualizer.stopAnimation();
      this.behaviorVisualizer = null;
    }
  }
}

const educationManager = new EducationManager();

export default {
  loadLessonContent,
  educationManager,
  EducationManager
};
