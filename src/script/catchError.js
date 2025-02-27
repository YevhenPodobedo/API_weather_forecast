'use strict';

import { query } from "./utils.js";

export function inputError(argument, render, message) {

  if (!argument) {
    setTimeout(() => {
      query(render).textContent = `Celected: ${message}`;
    }, 500)

    return true;
  }
  return false;
};

export function catchError(argument, render, message) {

  if(argument.cod !== '200') {

    setTimeout(() => {
      query(render).textContent = `Celected: ${message}`;
    }, 500)

    return true;
  } 
  return false;
};