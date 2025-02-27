'use strict';

import { tempMark } from "./utils.js";

export const currentIconWeatherTemplate = (icon1, icon2) => {
  return `${(icon1) ? `<img src="${icon1}" alt="foxminded">` : ''}
          ${(icon2) ? `<img src="${icon2}" alt="foxminded">` : ''}
        `;
};

export const dailyForecastTemplate = (day, weather, tempDay, tempNight, icon) => {
  return `<article class="weekly-weather-forecast__day">

            <h1 class="weekly-weather-forecast__name-day">${day}</h1>

            <div class="weekly-weather-forecast__image">
              <img src="./icon/fox.svg" alt="foxminded">
              <img src="${icon}" alt="foxminded">
            </div>

            <h2 class="weekly-weather-forecast__condition">${weather}</h2>

            <div class="weekly-weather-forecast__wrapper">

              <p class="weekly-weather-forecast__text">Day</p>
              <p class="weekly-weather-forecast__temperature">${tempMark(tempDay) + tempDay}</p>
              <p class="weekly-weather-forecast__temperature">${tempMark(tempNight) + tempNight}</p>
              <p class="weekly-weather-forecast__text">Night</p>

            </div>
            
          </article>`;
};
