"use strict";

import { query, renderity, renderityWithExclude, tempMark } from "./utils.js";
import { currentIconWeatherTemplate, dailyForecastTemplate,} from "./templates.js";
import { weatherConditions } from "./dataSet.js";
import { fullNameCountryAPI } from "./requestsAPI.js";

export function renderWeather(arrayOfData) {
  const data = arrayOfData;

  renderityWithExclude(".weather-forecast__container", "PICTURE");
  renderity(".weather-forecast__image--icons");
  renderity(".search__information-display");

  setTimeout(() => {
    renderityWithExclude(".weather-forecast__container", "PICTURE", 1);
    renderity(".weather-forecast__image--icons", 1);
    renderity(".search__information-display", 1);

    // array data API
    const city = data.city.name;
    const country = data.city.country;
    const weather = data.list[0].weather[0].main;
    const tempDay = Math.round(data.list[0].main.temp);
    const tempNight = Math.round(data.list[5].main.temp);

    query(".weather-forecast__temperature--day").innerHTML = `${tempMark(tempDay)}${tempDay}&deg;C`;
    query(".weather-forecast__condition").textContent = weather;
    fullNameCountryAPI(city, country);

    query(".weather-forecast__night-condition").textContent = data.list[5].weather[0].main;
    query(".weather-forecast__temperature--night").innerHTML = `${tempMark(tempNight)} ${tempNight}&deg;C`;

    // block icons
    const icon2 = getIcon2Weather(weatherConditions, weather);
    const icon1 = getIconWeather(weatherConditions, weather);
    query(".weather-forecast__image--icons").innerHTML = currentIconWeatherTemplate(icon1, icon2);
  }, 700);
};

export function renderWeatherForecast(arrayOfData) {
  const data = arrayOfData;
  const list = query(".weekly-weather-forecast");
  renderity(".weekly-weather-forecast");

  setTimeout(() => {
    list.innerHTML = "";
    renderity(".weekly-weather-forecast", 1);

    let indexDay = 8;
    let indexNight = 13;

    for (let i = 0; i < 4; i++) {
      const dayOfTheWeek = new Date(data.list[indexDay].dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
      const weather = data.list[indexDay].weather[0].main;
      const tempDay = Math.round(data.list[indexDay].main.temp);
      const tempNight = Math.round(data.list[indexNight].main.temp);
      const icon = getIconWeatherForcast(weatherConditions, weather);

      list.innerHTML += dailyForecastTemplate(dayOfTheWeek, weather, tempDay, tempNight, icon);
      (indexDay += 8), (indexNight += 8);
    }
  }, 900);
};

// additional funcitons
  function getIconWeatherForcast(arrayWeather, targetID) {
    let iconPath = "";

    arrayWeather.forEach((item) => {
      if (item.main === targetID) {
        iconPath = item.icon;
      }
    });

    return iconPath;
  };

  function getIconWeather(arrayWeather, targetID) {
    let iconPath = "";

    arrayWeather.forEach((item) => {
      if (item.main === targetID) {
        iconPath = item.icon2;
      }
    });

    return iconPath;
  };

  function getIcon2Weather(arrayWeather, weather) {
    const weatherConditions = ["Clouds", "Snow", "Rain", "Thunderstorm"];

    let iconPath = "";

    for (let elem of weatherConditions) {
      if (elem === weather) {
        arrayWeather.forEach((item) => {
          if (item.main === weather) {
            iconPath = item.icon2;
          }
        });
      }
    }

    return iconPath;
  };
