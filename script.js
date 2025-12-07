// bfoAlgorithm.js
// الگوریتم Bacterial Foraging Optimization (BFO) خالص و مستقل

class Bacteria {
  constructor(x) {
    this.x = x;  // موقعیت باکتری
  }

  // محاسبه مقدار تابع هدف
  fitness() {
    return (this.x - 3) ** 2;
  }

  // حرکت Chemotaxis (Run/Tumble)
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

// اجرای الگوریتم BFO روی جمعیت اولیه
function runBFO(populationValues = [0, 1, 2, 4, 5], iterations = 3) {
  // ایجاد باکتری‌ها
  let population = populationValues.map(val => new Bacteria(val));

  // Chemotaxis
  for (let i = 0; i < iterations; i++) {
    population.forEach(b => b.chemotaxis());
  }

  // Reproduction: مرتب‌سازی باکتری‌ها بر اساس fitness
  population.sort((a, b) => a.fitness() - b.fitness());

  // Elimination/Dispersal: پراکندگی تصادفی باکتری‌های ضعیف (آخرین‌ها)
  population.slice(-2).forEach(b => b.x = Math.floor(Math.random() * 6));

  // نتیجه نهایی
  return population.map(b => ({x: b.x, fitness: b.fitness()}));
}
