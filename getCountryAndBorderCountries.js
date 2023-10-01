'use strict';
//////////////////////////////////////////////////////
const getCountryAndBorderCountries = function (country) {
  //вызов AJAX для получение  данных о  стране
  const request = new XMLHttpRequest();
  //открыли запрос
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  //отправить запрос
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    //Отображение страны
    displayCountry(data);
    //получаем первую соседнюю страну
    const [firstNeighbour] = data.borders;

    if (!firstNeighbour) return;

    //вызов AJAX для получение  данных о  стране
    const request = new XMLHttpRequest();
    //открыли запрос
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    //отправить запрос
    request.send();
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
    });
  });

  getCountryAndBorderCountries('usa');
};
