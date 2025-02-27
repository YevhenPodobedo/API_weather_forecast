'use strict';

import { query } from "./utils.js";

export async function weatherAPI(city) {
  const apiKey = '483dbee219f23936e7a1b592281158c1';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
  const responce = await fetch(weatherUrl);
  const data = await responce.json();
    return data;
};

export async function fullNameCountryAPI(city, country) {
  const responce = await fetch(`https://restcountries.com/v3.1/alpha/${country}`)
  const data = await responce.json()
  const countryName = data[0].name.common;

  query('.weather-forecast__country').textContent = `${city}, ${countryName}`;
  query('.search__information-display').textContent = `Celected: ${city}, ${countryName}`;
};