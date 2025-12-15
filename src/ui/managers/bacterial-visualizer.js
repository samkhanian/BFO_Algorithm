class BacterialVisualizer {
  constructor(canvasElement) {
    this.canvas = typeof canvasElement === 'string' 
      ? document.getElementById(canvasElement) 
      : canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.bacteria = [];
    this.food = null;
    this.animationId = null;
    this.isRunning = false;
    this.step = 0;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  initBacteria(count = 5) {
    this.bacteria = [];
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let i = 0; i < count; i++) {
      this.bacteria.push({
        x: centerX + (Math.random() - 0.5) * 80,
        y: centerY + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        angle: Math.random() * Math.PI * 2,
        fitness: 0,
        trail: [],
        state: 'running',
        color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
      });
    }

    this.food = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    };
  }

  drawBacterium(bacterium, size = 8) {
    const ctx = this.ctx;

    ctx.save();
    ctx.translate(bacterium.x, bacterium.y);
    ctx.rotate(bacterium.angle);

    ctx.fillStyle = bacterium.color;
    ctx.fillRect(-size / 2, -size / 2, size, size);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-size / 2, -size / 2, size, size);

    ctx.restore();
  }

  drawTrail(bacterium) {
    if (bacterium.trail.length < 2) return;

    const ctx = this.ctx;
    ctx.strokeStyle = bacterium.color;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bacterium.trail[0].x, bacterium.trail[0].y);

    for (let i = 1; i < bacterium.trail.length; i++) {
      ctx.lineTo(bacterium.trail[i].x, bacterium.trail[i].y);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  drawFood(halo = true) {
    const ctx = this.ctx;

    if (halo) {
      ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.beginPath();
      ctx.arc(this.food.x, this.food.y, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.food.x, this.food.y, 80, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(this.food.x, this.food.y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.beginPath();
    ctx.arc(this.food.x, this.food.y, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  drawBackground() {
    const ctx = this.ctx;
    const isDark = document.body.classList.contains('dark-mode');

    ctx.fillStyle = isDark ? '#1a1a1a' : '#f9fafb';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.strokeStyle = isDark ? '#333' : '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 10]);

    for (let x = 0; x < this.canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < this.canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvas.width, y);
      ctx.stroke();
    }

    ctx.setLineDash([]);
  }

  calculateFitness(bacterium) {
    const dx = bacterium.x - this.food.x;
    const dy = bacterium.y - this.food.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  updateBacterium(bacterium) {
    const oldFitness = bacterium.fitness;
    bacterium.fitness = this.calculateFitness(bacterium);

    if (bacterium.fitness < oldFitness) {
      bacterium.state = 'running';
    } else {
      bacterium.state = 'tumbling';
      bacterium.angle = Math.random() * Math.PI * 2;
    }

    const dx = this.food.x - bacterium.x;
    const dy = this.food.y - bacterium.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      const targetAngle = Math.atan2(dy, dx);
      bacterium.angle += (targetAngle - bacterium.angle) * 0.05;
    }

    const speed = bacterium.state === 'running' ? 2 : 0.5;
    bacterium.x += Math.cos(bacterium.angle) * speed;
    bacterium.y += Math.sin(bacterium.angle) * speed;

    bacterium.x = Math.max(10, Math.min(this.canvas.width - 10, bacterium.x));
    bacterium.y = Math.max(10, Math.min(this.canvas.height - 10, bacterium.y));

    bacterium.trail.push({ x: bacterium.x, y: bacterium.y });
    if (bacterium.trail.length > 100) {
      bacterium.trail.shift();
    }
  }

  update() {
    this.bacteria.forEach((bacterium) => {
      this.updateBacterium(bacterium);
    });
    this.step++;
  }

  draw() {
    this.drawBackground();
    this.drawFood();

    this.bacteria.forEach((bacterium) => {
      this.drawTrail(bacterium);
    });

    this.bacteria.forEach((bacterium) => {
      this.drawBacterium(bacterium);
    });

    this.drawStats();
  }

  drawStats() {
    const ctx = this.ctx;
    const isDark = document.body.classList.contains('dark-mode');
    const textColor = isDark ? '#e5e7eb' : '#1f2937';

    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px Vazirmatn, sans-serif';

    const bestBacteria = this.bacteria.reduce((best, b) =>
      b.fitness < best.fitness ? b : best
    );

    const stats = [
      `Step: ${this.step}`,
      `Best Distance: ${bestBacteria.fitness.toFixed(2)}px`,
      `Bacteria: ${this.bacteria.length}`,
    ];

    stats.forEach((stat, i) => {
      ctx.fillText(stat, 20, 30 + i * 25);
    });
  }

  animate() {
    this.update();
    this.draw();

    if (this.isRunning) {
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  reset() {
    this.step = 0;
    this.bacteria.forEach((b) => {
      b.trail = [];
      b.fitness = 0;
    });
    this.draw();
  }
}

export default BacterialVisualizer;
