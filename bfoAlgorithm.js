// Bacterial Foraging Optimization (BFO) الگوریتم خالص

class Bacteria {
  constructor(x) {
    this.x = x; // موقعیت باکتری
  }

  // محاسبه fitness تابع هدف
  fitness() {
    return (this.x - 3) ** 2;
  }

  // حرکت Chemotaxis
  chemotaxis(stepSize = 1) {
    while (true) {
      let currentFit = this.fitness();
      let newX = this.x + (this.x < 3 ? stepSize : -stepSize);
      let newFit = (newX - 3) ** 2;
      if (newFit < currentFit) this.x = newX;
      else break;
    }
  }
}

// اجرای BFO روی جمعیت
function runBFO(populationValues = [0,1,2,4,5], iterations = 3) {
  let population = populationValues.map(val => new Bacteria(val));

  // Chemotaxis
  for (let i=0; i<iterations; i++) {
    population.forEach(b => b.chemotaxis());
  }

  // Reproduction: مرتب‌سازی باکتری‌ها
  population.sort((a,b) => a.fitness() - b.fitness());

  // Elimination/Dispersal: پراکندگی باکتری‌های ضعیف
  population.slice(-2).forEach(b => b.x = Math.floor(Math.random() * 6));

  // بازگرداندن نتایج
  return population.map(b => ({x: b.x, fitness: b.fitness()}));
}
