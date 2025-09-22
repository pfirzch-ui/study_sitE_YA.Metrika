# Тестовый лендинг для обучения Яндекс.Метрике

## 1) Получить ID счётчика Метрики
Создай счётчик на https://metrika.yandex.ru и скопируй **ID** (число).

## 2) Подставить ID в код
Открой `index.html` и замени `YOUR_COUNTER_ID` на свой ID — в двух местах:
```js
const METRICA_ID = YOUR_COUNTER_ID;
// ...
<noscript><img src="https://mc.yandex.ru/watch/YOUR_COUNTER_ID" ...></noscript>
