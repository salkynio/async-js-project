'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const displayCountry = function (data, className = '') {
  const currencies = data.currencies;
  const currensyName = Object.values(currencies)[0].name;
  const currensySymbol = Object.values(currencies)[0].symbol;
  const languages = data.languages;
  const firstLanguage = Object.values(languages)[0];
  const html = ` 
       <article class="country ${className}">
        <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👨‍👩‍👧‍👦</span>${
            +data.population / 1000000
          } миллионов </p>
          <p class="country__row"><span>🗣️</span>${firstLanguage}</p>
          <p class="country__row"><span>💰</span>${currensySymbol} ${currensyName}</p>
          </div>
      </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

//////////////////////////////////////////////////////
// const getCountryAndBorderCountries = function (country) {
//   //вызов AJAX для получение  данных о  стране
//   const request1 = new XMLHttpRequest();
//   //открыли запрос
//   request1.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   //отправить запрос
//   request1.send();
//   request1.addEventListener('load', function () {
//     const [data1] = JSON.parse(this.responseText);
//     //Отображение страны
//     displayCountry(data1);
//     //получаем первую соседнюю страну
//     const [firstNeighbour] = data1.borders;
//     if (!firstNeighbour) return;
//     //вызов AJAX для получение  данных о соседней  стране
//     const request2 = new XMLHttpRequest();
//     //открыли запрос
//     request2.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${firstNeighbour}`
//     );
//     //отправить запрос
//     request2.send();
//     //request2 зависим от request1, так как мы вызывакм request2 внутри callback request1
//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       displayCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndBorderCountries('usa');

const getCountryData = function (countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
      displayCountry(data[0]);
      const firstNeighbour = data[0].borders[0];
      if (!firstNeighbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
    })
    .then(response => response.json())
    .then(data => displayCountry(data[0], 'neighbour'))
    .catch(e => {
      console.error(`${e}`);
      displayError(`Что-то пошло не так, ${e.message}.Попробуйте еще раз!`)
    })
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});
