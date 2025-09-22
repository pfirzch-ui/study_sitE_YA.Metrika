// === app.js (финальная версия с целями Метрики) ===
document.addEventListener('DOMContentLoaded', () => {
  // Подстраховка: аккуратно отправляем цель, если ym уже загружен
  const safeGoal = (name) => {
    if (typeof ym === 'function') {
      ym(104241081, 'reachGoal', name);
      console.log('[Metrika] reachGoal:', name);
    } else {
      console.warn('[Metrika] Скрипт Метрики ещё не загрузился');
    }
  };

  // --- Форма заявки: lead_submit ---
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      safeGoal('lead_submit');         // ← отправка цели
      form.reset();
      alert('Заявка отправлена (демо)');
    });
  }

  // --- Кнопка звонка: call_click ---
  const callLink = document.getElementById('callLink');
  if (callLink) {
    callLink.addEventListener('click', () => safeGoal('call_click'));
  }

  // --- Переход к ценам: visit_prices ---
  const pricesLink = document.getElementById('pricesLink');
  if (pricesLink) {
    pricesLink.addEventListener('click', () => safeGoal('visit_prices'));
  }

  // --- Скачать планировки: download_plans ---
  const downloadPlans = document.getElementById('downloadPlans');
  if (downloadPlans) {
    downloadPlans.addEventListener('click', (e) => {
      e.preventDefault();              // демо-ссылка
      safeGoal('download_plans');
      alert('Здесь может быть ссылка на PDF (демо)');
    });
  }

  // --- Калькулятор ипотеки: mortgage_calc ---
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      // Рассчитаем платёж и выведем (необязательно для цели)
      const price = Number(document.getElementById('price')?.value || 0);
      const down  = Number(document.getElementById('down')?.value  || 0);
      const rate  = Number(document.getElementById('rate')?.value  || 0);
      const years = Number(document.getElementById('years')?.value || 0);

      const paymentEl = document.getElementById('payment');
      const pmt = calcPayment(price, down, rate, years);
      if (paymentEl) {
        paymentEl.textContent = `Ориентировочный платёж: ~ ${pmt.toLocaleString('ru-RU')} ₽/мес`;
      }

      safeGoal('mortgage_calc');       // ← отправка цели
    });
  }

  // Вспомогательная функция расчёта аннуитетного платежа
  function calcPayment(price, downPct, ratePct, years) {
    const P = price * (1 - downPct / 100);
    const i = ratePct / 100 / 12;
    const n = years * 12;
    if (!i) return Math.round(P / n);
    const k = i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
    return Math.round(P * k);
  }
});
