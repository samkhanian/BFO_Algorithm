const contentSection = document.getElementById('content');
const btnFA = document.getElementById('btn-fa');
const btnEN = document.getElementById('btn-en');
const canvas = document.getElementById('bfoCanvas');
const ctx = canvas.getContext('2d');
const outputDiv = document.getElementById('bfo-output');

// محتوای فارسی
const contentFA = `
# الگوریتم جستجوی باکتریایی (BFO)
دانشجو: جمال سامخانیان
درس: هوش مصنوعی
استاد: دکتر رویا نمیرانیان

الگوریتم BFO یک روش بهینه‌سازی الهام‌گرفته از رفتار باکتری‌ها است...
`;

// محتوای انگلیسی
const contentEN = `
# Bacterial Foraging Optimization (BFO)
Student: Jamal Samkhanian
Course: Artificial Intelligence
Professor: Dr. Roya Namirany

BFO is a nature-inspired optimization algorithm...
`;

// تغییر زبان
btnFA.addEventListener('click', () => { contentSection.innerHTML = contentFA; });
btnEN.addEventListener('click', () => { contentSection.innerHTML = contentEN; });
contentSection.innerHTML = contentFA;

// نمایش نتایج BFO روی Canvas و متن
document.getElementById('runBFO').addEventListener('click', () => {
  const results = runBFO([0,1,2,4,5], 3);

  // پاک کردن Canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // رسم محور
  ctx.beginPath();
  ctx.moveTo(0,150);
  ctx.lineTo(600,150);
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // رسم باکتری‌ها
  results.forEach((b, idx) => {
    ctx.beginPath();
    ctx.arc(b.x*100 + 50, 150, 10, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.strokeText(`B${idx+1}`, b.x*100 + 45, 140);
  });

  // نمایش خروجی متنی
  let log = results.map((b,i)=>`Bacteria ${i+1}: x=${b.x}, f(x)=${b.fitness}`).join('\n');
  log += '\nGlobal Minimum: x=3, f(x)=0';
  outputDiv.textContent = log;
});
