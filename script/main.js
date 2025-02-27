"use strict";

import { query, renderity, renderityWithExclude } from "./utils.js";
import { weatherAPI } from "./requestsAPI.js";
import { renderWeather, renderWeatherForecast } from "./weather.js";
import { inputError, catchError } from "./catchError.js";
import { resetFetch } from "./reset.js";

const ERROR_MESSAGE_EMPTY = "No city selected!";
const ERROR_MESSAGE_NOT_FOUND = "City not found!";

// #region handle event
  async function handleEvent(event) {
    
    if(event.key !== 'Enter' && event.type !== 'blur') {
      return;
    }
    
    event.preventDefault();
    const city = inputCity.value.trim();

    if (inputError(city, ".search__information-display", ERROR_MESSAGE_EMPTY)) {
      renderityWithExclude(".weather-forecast__container", "PICTURE");
      renderity(".weather-forecast__image--icons");
      resetFetch(".weekly-weather-forecast");

      return;
    }

    const weather = await weatherAPI(city);

    if (catchError(weather, ".search__information-display", ERROR_MESSAGE_NOT_FOUND)) {
      renderityWithExclude(".weather-forecast__container", "PICTURE");
      renderity(".weather-forecast__image--icons");
      resetFetch(".weekly-weather-forecast");
      
      return;
    }

    renderWeather(weather);
    renderWeatherForecast(weather);
  };
// #endregion

const inputCity = query('input[name="input-city"]');

["keydown", "blur"].forEach((eventType) => {
  inputCity.addEventListener(eventType, handleEvent);
});

query(".search__btn-reset").addEventListener("click", function () {

  renderityWithExclude(".weather-forecast__container", "PICTURE");
  renderity(".weather-forecast__image--icons");

  resetFetch(".weekly-weather-forecast");
  resetFetch(".search__information-display", 1);
});
