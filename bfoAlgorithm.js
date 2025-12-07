class Bacteria {
  constructor(x, id) {
    this.x = x; // موقعیت باکتری
    this.id = id; // شناسه باکتری
  }

  fitness() {
    return (this.x - 3) ** 2; // تابع هدف
  }

  chemotaxis(stepSize=1) {
    let path = [this.x];
    while(true){
      let currentFit = this.fitness();
      let newX = this.x + (this.x < 3 ? stepSize : -stepSize);
      let newFit = (newX - 3)**2;
      if(newFit < currentFit){
        this.x = newX;
        path.push(this.x);
      } else break;
    }
    return path;
  }
}

function runBFOUntilConverge(populationValues=[0,1,2,4,5]) {
  let population = populationValues.map((v,i)=> new Bacteria(v,i+1));
  let stepsLog = [];
  let converged = false;

  stepsLog.push({type:"initial", population:population.map(b=>b.x)});

  while(!converged){
    let chemPaths = [];
    population.forEach(b=>{
      let path = b.chemotaxis();
      chemPaths.push({id:b.id, path});
    });
    stepsLog.push({type:"chemotaxis", chemPaths, population:population.map(b=>b.x)});

    // Reproduction
    population.sort((a,b)=>a.fitness()-b.fitness());
    stepsLog.push({type:"reproduction", population:population.map(b=>b.x)});

    // Elimination/Dispersal
    population.slice(-2).forEach(b=>b.x = Math.floor(Math.random()*6));
    stepsLog.push({type:"elimination", population:population.map(b=>b.x)});

    // بررسی همگرایی: همه باکتری‌ها x=3 یا ثابت شده باشند
    converged = population.every(b=>b.x===3);
  }

  stepsLog.push({type:"final", best:{x:3,f:0}, population:population.map(b=>b.x)});
  return stepsLog;
}
