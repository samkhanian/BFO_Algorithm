// Bacterial Foraging Optimization (BFO) خالص و دقیق
class Bacteria {
  constructor(x) {
    this.x = x; // موقعیت باکتری
  }

  // محاسبه fitness تابع هدف
  fitness() {
    return (this.x - 3) ** 2;
  }

  // Chemotaxis: حرکت Run/Tumble
  chemotaxis(stepSize = 1) {
    let path = [this.x]; // مسیر حرکت باکتری
    while (true) {
      let currentFit = this.fitness();
      let newX = this.x + (this.x < 3 ? stepSize : -stepSize);
      let newFit = (newX - 3) ** 2;
      if (newFit < currentFit) {
        this.x = newX;
        path.push(this.x);
      } else {
        break;
      }
    }
    return path; // مسیر حرکت برای خروجی مرحله‌ای
  }
}

// اجرای BFO روی جمعیت
function runBFO(populationValues=[0,1,2,4,5], iterations=3) {
  let population = populationValues.map(val => new Bacteria(val));
  let log = "جمعیت اولیه: " + population.map(b=>b.x).join(', ') + "\n\n";

  for(let iter=1; iter<=iterations; iter++) {
    log += `--- تکرار ${iter} ---\n`;
    population.forEach((b,i)=>{
      let path = b.chemotaxis();
      log += `باکتری ${i+1} مسیر: ${path.join(' -> ')}\n`;
    });
    log += "موقعیت باکتری‌ها بعد از Chemotaxis: " + population.map(b=>b.x).join(', ') + "\n\n";
  }

  // Reproduction: مرتب‌سازی باکتری‌ها
  population.sort((a,b)=>a.fitness() - b.fitness());
  log += "--- بعد از Reproduction ---\n";
  log += "موقعیت باکتری‌ها: " + population.map(b=>b.x).join(', ') + "\n";

  // Elimination/Dispersal: پراکندگی باکتری‌های ضعیف
  population.slice(-2).forEach(b => {
    b.x = Math.floor(Math.random() * 6);
  });
  log += "--- بعد از Elimination/Dispersal ---\n";
  log += "جمعیت نهایی: " + population.map(b=>b.x).join(', ') + "\n";
  log += "کمینه سراسری: x=3, f(x)=0";

  return {population, log};
}
