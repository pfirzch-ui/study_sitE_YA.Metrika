// Расчёт аннуитетного платежа
function calcPayment(price, downPct, ratePct, years){
  const P = price * (1 - downPct/100);
  const i = ratePct/100/12;
  const n = years*12;
  if (i === 0) return Math.round(P/n);
  const k = i * Math.pow(1+i, n) / (Math.pow(1+i, n)-1);
  return Math.round(P * k);
}

// Обёртка для отправки целей в Метрику
function goal(name, params={}){
  try{
    if (typeof METRICA_ID !== 'undefined' && typeof ym === 'function' && String(METRICA_ID).match(/^\d+$/)){
      ym(METRICA_ID, 'reachGoal', name, params);
      console.log('[Метрика] Goal:', name, params);
    } else {
      console.log('[Метрика] (demo) Goal:', name, params);
    }
  }catch(e){ console.warn('Goal error', e); }
}

// UI-обработчики
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadForm');
  const callLink = document.getElementById('callLink');
  const pricesLink = document.getElementById('pricesLink');
  const downloadPlans = document.getElementById('downloadPlans');
  const calcBtn = document.getElementById('calcBtn');
  const payment = document.getElementById('payment');

  if (form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      goal('lead_submit');
      form.reset();
      alert('Заявка отправлена (демо)');
    });
  }

  if (callLink){
    callLink.addEventListener('click', ()=> goal('call_click'));
  }
  if (pricesLink){
    pricesLink.addEventListener('click', ()=> goal('visit_prices'));
  }
  if (downloadPlans){
    downloadPlans.addEventListener('click', (e)=>{
      e.preventDefault();
      goal('download_plans');
      alert('Здесь может быть ссылка на PDF (демо)');
    });
  }
  if (calcBtn){
    calcBtn.addEventListener('click', ()=>{
      const price = Number(document.getElementById('price').value || 0);
      const down = Number(document.getElementById('down').value || 0);
      const rate = Number(document.getElementById('rate').value || 0);
      const years = Number(document.getElementById('years').value || 0);
      const pmt = calcPayment(price, down, rate, years);
      payment.textContent = `Ориентировочный платёж: ~ ${pmt.toLocaleString('ru-RU')} ₽/мес`;
      goal('mortgage_calc', {pmt});
    });
  }
});
