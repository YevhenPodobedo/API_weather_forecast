'use strict';

import { query } from "./utils.js";

export function resetFetch(nameItem, opacity = 0) {
  const item = query(nameItem);

  item.style.opacity = opacity;

  setTimeout(() => {
    item.innerHTML = '';
  }, 500);
};
