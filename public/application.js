// обьект с курсами выбранных валют
const currency = {};

// элементы для отображения курсов валют
const elementBGN = document.querySelector('[data-value="BGN"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementINR = document.querySelector('[data-value="INR"]');

// элементы формыб ввод суммыбвыбор валютыб поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

// функция получени курса валют и вывод их на страницу
async function getCurrent() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await response.json();
  const result = await data;

  console.log(currency);

  currency.BGN = result.Valute.BGN;// болгарский лев
  currency.EUR = result.Valute.EUR;// евро
  currency.INR = result.Valute.INR;// индийский рупий

  elementBGN.textContent = currency.BGN.Value.toFixed(2);
  elementEUR.textContent = currency.EUR.Value.toFixed(2);
  elementINR.textContent = currency.INR.Value.toFixed(2);

  // логика на изминения валюты Болгарский лев
  if (currency.BGN.Value > currency.BGN.Previous) {
    elementBGN.classList.add('top');
    // elementBGN.classList.remove('bottom');//это на случай если сайт запущен постоянно
  } else {
    elementBGN.classList.add('bottom');
    // elementBGN.classList.remove('top');
  }
  // Евро
  if (currency.EUR.Value > currency.EUR.Previous) {
    elementEUR.classList.add('top');
    // elementEUR.classList.remove('bottom');//это на случай если сайт запущен постоянно
  } else {
    elementEUR.classList.add('bottom');
    // elementEUR.classList.remove('top');
  }
  // Индийский рупий
  if (currency.INR.Value > currency.INR.Previous) {
    elementINR.classList.add('top');
    // elementINR.classList.remove('bottom');//это на случай если сайт запущен постоянно
  } else {
    elementINR.classList.add('bottom');
    // elementINR.classList.remove('top');
  }
}
// getCurrent();
// обновления каждую секунду, но API обновляется раз в сутки
setInterval(getCurrent(), 1000);
// функция конвертации валюты
function convertValue() {
  console.log('Change');
  result.value = (parseFloat(input.value) / currency[select.value].Value).toFixed(2);
}
// слушаем изминения в текстовом поле и в select
input.oninput = convertValue;
input.select = convertValue;
