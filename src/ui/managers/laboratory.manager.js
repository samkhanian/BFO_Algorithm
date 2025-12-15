import i18n from '../../config/i18n.js';

class BFOSimulation {
  constructor(canvas, params = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.params = {
      bacteriaCount: params.bacteriaCount || 50,
      chemoSteps: params.chemoSteps || 10,
      reproFreq: params.reproFreq || 10,
      edProb: params.edProb || 0.05,
      ...params
    };

    this.bacteria = [];
    this.iterations = 0;
    this.bestFitness = Infinity;
    this.running = false;
    this.history = [];
    
    this.initializeBacteria();
  }

  initializeBacteria() {
    this.bacteria = [];
    for (let i = 0; i < this.params.bacteriaCount; i++) {
      this.bacteria.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        fitness: this.calculateFitness(Math.random() * this.canvas.width, Math.random() * this.canvas.height),
        health: 0
      });
    }
    this.updateBestFitness();
  }

  calculateFitness(x, y) {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    return Math.max(0, 200 - distance);
  }

  updateBestFitness() {
    let best = Infinity;
    this.bacteria.forEach((bacterium) => {
      if (bacterium.fitness < best) {
        best = bacterium.fitness;
      }
    });
    this.bestFitness = best;
  }

  chemotaxis() {
    const C = 1;
    
    this.bacteria.forEach((bacterium) => {
      for (let step = 0; step < this.params.chemoSteps; step++) {
        const angle = Math.random() * 2 * Math.PI;
        const newX = bacterium.x + C * Math.cos(angle);
        const newY = bacterium.y + C * Math.sin(angle);
        
        const newFitness = this.calculateFitness(newX, newY);
        
        if (newFitness > bacterium.fitness) {
          bacterium.x = Math.max(0, Math.min(this.canvas.width, newX));
          bacterium.y = Math.max(0, Math.min(this.canvas.height, newY));
          bacterium.fitness = newFitness;
          bacterium.health += newFitness;
        }
      }
    });
  }

  swarming() {
    this.bacteria.forEach((bacterium) => {
      let attraction = 0;
      this.bacteria.forEach((other) => {
        if (other.fitness > bacterium.fitness) {
          const dist = Math.sqrt((other.x - bacterium.x) ** 2 + (other.y - bacterium.y) ** 2);
          if (dist < 50) {
            attraction += (other.fitness - bacterium.fitness) / (dist + 1);
          }
        }
      });
      
      if (attraction > 0) {
        bacterium.x += attraction * 0.1;
        bacterium.y += attraction * 0.1;
        bacterium.x = Math.max(0, Math.min(this.canvas.width, bacterium.x));
        bacterium.y = Math.max(0, Math.min(this.canvas.height, bacterium.y));
        bacterium.fitness = this.calculateFitness(bacterium.x, bacterium.y);
      }
    });
  }

  reproduction() {
    const healthyBacteria = this.bacteria
      .sort((a, b) => b.health - a.health)
      .slice(0, Math.ceil(this.params.bacteriaCount / 2));

    const newBacteria = [];
    healthyBacteria.forEach((bacterium) => {
      newBacteria.push({
        x: bacterium.x + (Math.random() - 0.5) * 10,
        y: bacterium.y + (Math.random() - 0.5) * 10,
        fitness: bacterium.fitness,
        health: 0
      });
    });

    this.bacteria = this.bacteria.concat(newBacteria).slice(0, this.params.bacteriaCount);
    
    this.bacteria.forEach((bacterium) => {
      bacterium.health = 0;
    });
  }

  eliminationAndDispersal() {
    for (let i = 0; i < this.bacteria.length; i++) {
      if (Math.random() < this.params.edProb) {
        this.bacteria[i] = {
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          fitness: this.calculateFitness(Math.random() * this.canvas.width, Math.random() * this.canvas.height),
          health: 0
        };
      }
    }
  }

  step() {
    this.chemotaxis();
    this.swarming();
    
    if (this.iterations % this.params.reproFreq === 0) {
      this.reproduction();
      this.eliminationAndDispersal();
    }

    this.updateBestFitness();
    this.history.push({
      iteration: this.iterations,
      bestFitness: this.bestFitness,
      avgFitness: this.bacteria.reduce((sum, b) => sum + b.fitness, 0) / this.bacteria.length
    });

    this.iterations++;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = 'rgba(248, 250, 252, 0.5)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.bacteria.forEach((bacterium) => {
      const intensity = Math.min(255, Math.floor(bacterium.fitness * 1.27));
      this.ctx.fillStyle = `rgb(37, 99, 235, 0.7)`;
      this.ctx.beginPath();
      this.ctx.arc(bacterium.x, bacterium.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.fillStyle = '#dc2626';
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  reset() {
    this.iterations = 0;
    this.bestFitness = Infinity;
    this.history = [];
    this.initializeBacteria();
    this.draw();
  }

  getStatistics() {
    if (this.history.length === 0) {
      return {
        iterations: 0,
        bestFitness: '---',
        avgFitness: '---',
        improvement: '0%'
      };
    }

    const latest = this.history[this.history.length - 1];
    const initial = this.history[0];
    const improvement = ((initial.bestFitness - latest.bestFitness) / initial.bestFitness) * 100;

    return {
      iterations: latest.iteration,
      bestFitness: latest.bestFitness.toFixed(2),
      avgFitness: latest.avgFitness.toFixed(2),
      improvement: Math.max(0, improvement.toFixed(2))
    };
  }
}

export function initializeLaboratorySimulation(canvas, params = {}) {
  const simulation = new BFOSimulation(canvas, params);
  
  return {
    simulation,
    startSimulation(interval = 100) {
      simulation.running = true;
      const animationId = setInterval(() => {
        if (simulation.running) {
          simulation.step();
          simulation.draw();
        }
      }, interval);
      return animationId;
    },
    stopSimulation() {
      simulation.running = false;
    },
    resetSimulation() {
      simulation.reset();
    },
    getStatistics() {
      return simulation.getStatistics();
    }
  };
}

export default BFOSimulation;
