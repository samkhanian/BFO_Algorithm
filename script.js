const runBtn = document.getElementById('runBFO');
const outputDiv = document.getElementById('bfo-output');
const canvas = document.getElementById('bfoCanvas');
const ctx = canvas.getContext('2d');
const flowCanvas = document.getElementById('flowchartCanvas');
const fctx = flowCanvas.getContext('2d');

runBtn.addEventListener('click', () => {
  const stepsLog = runBFOStepByStep([0,1,2,4,5], 3);
  outputDiv.textContent = "";

  stepsLog.forEach(step=>{
    if(step.type==="initial"){
      outputDiv.textContent += `جمعیت اولیه: ${step.population.join(', ')}\n\n`;
    } else if(step.type==="chemotaxis"){
      outputDiv.textContent += `--- تکرار ${step.iteration} ---\n`;
      step.chemPaths.forEach(b=>{
        outputDiv.textContent += `باکتری ${b.id} مسیر: ${b.path.join(' -> ')}\n`;
      });
      outputDiv.textContent += "جمعیت بعد از Chemotaxis: " + step.population.join(', ') + "\n\n";
    } else if(step.type==="reproduction"){
      outputDiv.textContent += "--- بعد از Reproduction ---\n";
      outputDiv.textContent += step.population.join(', ') + "\n\n";
    } else if(step.type==="elimination"){
      outputDiv.textContent += "--- بعد از Elimination/Dispersal ---\n";
      outputDiv.textContent += step.population.join(', ') + "\n\n";
    } else if(step.type==="final"){
      outputDiv.textContent += "--- جمعیت نهایی و کمینه سراسری ---\n";
      outputDiv.textContent += step.population.join(', ') + "\n";
      outputDiv.textContent += `کمینه سراسری: x=${step.best.x}, f(x)=${step.best.f}\n`;
    }
  });

  drawPopulation(stepsLog[stepsLog.length-1].population);
  drawFlowchart();
});

function drawPopulation(population){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.moveTo(0,150); ctx.lineTo(600,150);
  ctx.strokeStyle="#000";
  ctx.stroke();
  population.forEach((x, idx)=>{
    ctx.beginPath();
    ctx.arc(x*100+50,150,10,0,Math.PI*2);
    ctx.fillStyle="green"; ctx.fill();
    ctx.strokeText(`B${idx+1}`, x*100+45,140);
  });
}

function drawFlowchart(){
  fctx.clearRect(0,0,flowCanvas.width,flowCanvas.height);
  fctx.fillStyle="#0077b6"; fctx.font="16px Tahoma";
  const steps = [
    "شروع الگوریتم",
    "تعریف جمعیت باکتری‌ها",
    "حرکت Chemotaxis",
    "Reproduction",
    "Elimination/Dispersal",
    "پایان الگوریتم و کمینه"
  ];

  steps.forEach((step, i)=>{
    let y = 50 + i*50;
    fctx.fillStyle="#0077b6";
    fctx.fillRect(150,y-20,300,30);
    fctx.fillStyle="#fff";
    fctx.fillText(step,160,y);
    if(i<steps.length-1){
      fctx.strokeStyle="#000";
      fctx.beginPath();
      fctx.moveTo(300, y+10); fctx.lineTo(300, y+30);
      fctx.stroke();
    }
  });
}
