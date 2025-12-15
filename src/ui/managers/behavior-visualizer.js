class BehaviorVisualizer {
  constructor(canvasElement) {
    this.canvas = typeof canvasElement === 'string' 
      ? document.getElementById(canvasElement) 
      : canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.currentStep = 0;
    this.isAnimating = false;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  drawBackground() {
    const ctx = this.ctx;
    const isDark = document.body.classList.contains('dark-mode');
    ctx.fillStyle = isDark ? '#1a1a1a' : '#f9fafb';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  showChemotaxis() {
    const ctx = this.ctx;
    this.drawBackground();

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const isDark = document.body.classList.contains('dark-mode');

    ctx.fillStyle = isDark ? '#e5e7eb' : '#1f2937';
    ctx.font = 'bold 18px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('شیمی‌جویی (Chemotaxis)', centerX, 40);

    ctx.font = '14px Vazirmatn, sans-serif';
    ctx.fillStyle = isDark ? '#a0aec0' : '#4b5563';

    const bacterium = {
      x: centerX - 150,
      y: centerY,
      size: 15,
      color: '#3b82f6',
    };

    const food = {
      x: centerX + 150,
      y: centerY,
      size: 10,
    };

    const t = (Date.now() % 2000) / 2000;

    this.drawBacteriumDetailed(bacterium);
    this.drawFood(food);

    const stepX = centerX - 150 + t * 300;
    const runBacteria = {
      x: stepX,
      y: centerY,
      size: 15,
      color: '#10b981',
    };

    this.drawBacteriumDetailed(runBacteria);

    ctx.strokeStyle = isDark ? '#4ade80' : '#22c55e';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(runBacteria.x - 30, centerY - 30);
    ctx.lineTo(runBacteria.x - 30, centerY + 30);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = isDark ? '#a0aec0' : '#4b5563';
    ctx.textAlign = 'left';
    ctx.fillText('Run (حرکت)', centerX - 150, centerY + 80);
    ctx.fillText('Tumble (چرخش)', centerX + 50, centerY + 80);

    this.drawChemicalGradient(centerX, centerY + 120);
  }

  showSwarming() {
    const ctx = this.ctx;
    this.drawBackground();

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const isDark = document.body.classList.contains('dark-mode');

    ctx.fillStyle = isDark ? '#e5e7eb' : '#1f2937';
    ctx.font = 'bold 18px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('سواریدگی (Swarming)', centerX, 40);

    const t = (Date.now() % 3000) / 3000;
    const bestX = centerX + 100;
    const bestY = centerY - 80;

    const bacteria = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const distance = 80 + Math.sin(t * Math.PI * 2) * 30;
      bacteria.push({
        x: bestX + Math.cos(angle) * distance,
        y: bestY + Math.sin(angle) * distance,
        color: '#f59e0b',
      });
    }

    const leader = {
      x: bestX,
      y: bestY,
      color: '#dc2626',
      size: 16,
    };

    ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
    ctx.lineWidth = 2;
    bacteria.forEach((b) => {
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(leader.x, leader.y);
      ctx.stroke();
    });

    bacteria.forEach((b) => {
      this.drawBacteriumDetailed({ ...b, size: 12 });
    });

    this.drawBacteriumDetailed(leader);

    ctx.fillStyle = isDark ? '#a0aec0' : '#4b5563';
    ctx.font = '14px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      'باکتری‌های موفق جاذب تولید می‌کنند',
      centerX,
      centerY + 100
    );
    ctx.fillText('سایر باکتری‌ها را جذب می‌کنند', centerX, centerY + 130);
  }

  showReproduction() {
    const ctx = this.ctx;
    this.drawBackground();

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const isDark = document.body.classList.contains('dark-mode');

    ctx.fillStyle = isDark ? '#e5e7eb' : '#1f2937';
    ctx.font = 'bold 18px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('تکثیر (Reproduction)', centerX, 40);

    const t = (Date.now() % 3000) / 3000;
    const stage = Math.floor(t * 3);

    const parentX = centerX - 100;
    const parentY = centerY;

    this.drawBacteriumDetailed({
      x: parentX,
      y: parentY,
      color: '#8b5cf6',
      size: 16,
    });

    ctx.fillStyle = isDark ? '#a0aec0' : '#4b5563';
    ctx.font = '12px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Parent Cell', parentX, parentY + 40);

    if (stage >= 1) {
      const childX = centerX + 100;
      const childY = centerY;
      const scale = stage === 1 ? 0.5 : 1;

      this.drawBacteriumDetailed({
        x: childX,
        y: childY,
        color: '#06b6d4',
        size: 16 * scale,
      });

      ctx.fillText('Child Cell', childX, childY + 40);
    }

    ctx.strokeStyle = isDark ? '#e879f9' : '#a855f7';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(parentX + 20, parentY);
    ctx.lineTo(centerX + 80, centerY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = isDark ? '#a0aec0' : '#4b5563';
    ctx.font = '14px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('باکتری‌های سالم تقسیم می‌شوند', centerX, centerY + 100);
  }

  showEliminationDispersal() {
    const ctx = this.ctx;
    this.drawBackground();

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const isDark = document.body.classList.contains('dark-mode');

    ctx.fillStyle = isDark ? '#e5e7eb' : '#1f2937';
    ctx.font = 'bold 18px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('حذف و پراکندگی (Elimination & Dispersal)', centerX, 40);

    const t = (Date.now() % 3000) / 3000;

    const bacteria = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      bacteria.push({
        x: centerX + Math.cos(angle) * 120,
        y: centerY + Math.sin(angle) * 120,
        color: '#ef4444',
        opacity: Math.random() > t ? 1 : 0.3,
      });
    }

    const newBacteria = [];
    if (t > 0.5) {
      for (let i = 0; i < 2; i++) {
        newBacteria.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          color: '#3b82f6',
          isNew: true,
        });
      }
    }

    bacteria.forEach((b) => {
      ctx.globalAlpha = b.opacity;
      this.drawBacteriumDetailed({ ...b, size: 12 });
      ctx.globalAlpha = 1;
    });

    newBacteria.forEach((b) => {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(b.x, b.y, 25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      this.drawBacteriumDetailed({ ...b, size: 12 });
    });

    ctx.fillStyle = isDark ? '#a0aec0' : '#4b5563';
    ctx.font = '14px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('برخی باکتری‌ها حذف می‌شوند', centerX - 100, centerY + 100);
    ctx.fillText('باکتری‌های جدید وارد می‌شوند', centerX + 100, centerY + 100);
  }

  drawBacteriumDetailed(bacterium) {
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(bacterium.x, bacterium.y);

    ctx.globalAlpha = bacterium.opacity || 1;

    ctx.fillStyle = bacterium.color + '40';
    ctx.beginPath();
    ctx.arc(0, 0, (bacterium.size || 12) * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = bacterium.color;
    ctx.beginPath();
    ctx.arc(0, 0, bacterium.size || 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, bacterium.size || 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  drawFood(food) {
    const ctx = this.ctx;

    ctx.fillStyle = '#22c55e40';
    ctx.beginPath();
    ctx.arc(food.x, food.y, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.size || 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.size || 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawChemicalGradient(x, y) {
    const ctx = this.ctx;
    const isDark = document.body.classList.contains('dark-mode');

    ctx.fillStyle = isDark ? '#a0aec0' : '#4b5563';
    ctx.font = '12px Vazirmatn, sans-serif';
    ctx.textAlign = 'center';

    const gradient = [
      { text: 'کم', x: x - 100, opacity: 0.3 },
      { text: 'متوسط', x: x, opacity: 0.6 },
      { text: 'زیاد', x: x + 100, opacity: 1 },
    ];

    gradient.forEach((g) => {
      ctx.globalAlpha = g.opacity;
      ctx.fillRect(g.x - 20, y, 40, 30);
      ctx.globalAlpha = 1;
    });

    gradient.forEach((g) => {
      ctx.fillText(g.text, g.x, y + 50);
    });

    ctx.fillStyle = isDark ? '#e5e7eb' : '#1f2937';
    ctx.fillText('غلظت مادۀ شیمیایی (Chemical Concentration)', x, y - 20);
  }

  showStep(step) {
    this.currentStep = step;

    switch (step) {
      case 0:
        this.showChemotaxis();
        break;
      case 1:
        this.showSwarming();
        break;
      case 2:
        this.showReproduction();
        break;
      case 3:
        this.showEliminationDispersal();
        break;
      default:
        this.drawBackground();
    }
  }

  startAnimation() {
    this.isAnimating = true;
    let step = 0;

    const animate = () => {
      this.showStep(step % 4);

      if (this.isAnimating) {
        setTimeout(() => {
          step++;
          animate();
        }, 3000);
      }
    };

    animate();
  }

  stopAnimation() {
    this.isAnimating = false;
  }

  nextStep() {
    this.currentStep = (this.currentStep + 1) % 4;
    this.showStep(this.currentStep);
  }

  prevStep() {
    this.currentStep = (this.currentStep - 1 + 4) % 4;
    this.showStep(this.currentStep);
  }
}

export default BehaviorVisualizer;
