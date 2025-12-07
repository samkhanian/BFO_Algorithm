const runBtn = document.getElementById('runBFO');
const outputDiv = document.getElementById('bfo-output');
const canvas = document.getElementById('bfoCanvas');
const ctx = canvas.getContext('2d');

runBtn.addEventListener('click', () => {
  const {population, log} = runBFO([0,1,2,4,5], 3);
  outputDiv.textContent = log;

  // رسم جمعیت نهایی باکتری‌ها
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // محور
  ctx.beginPath();
  ctx.moveTo(0,150); ctx.lineTo(600,150);
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // باکتری‌ها
  population.forEach((b, idx)=>{
    ctx.beginPath();
    ctx.arc(b.x*100 + 50, 150, 10,0,Math.PI*2);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.strokeText(`B${idx+1}`, b.x*100 +45, 140);
  });
});
