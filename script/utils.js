'use strict';

  export function query(name) {
    return document.querySelector(name);
  };

  export function tempMark(temp) {
    return (temp > 0) ? '+' : ' ';
  };

  export function renderity(nameContainer, opacity = 0) {
    const container = query(nameContainer);

    container.style.opacity = opacity;
  };

  export function renderityWithExclude(nameContainer, excludeTag, opacity = 0) {
    const container = query(nameContainer);

    for(let elem of container.children) {
      if(elem.tagName !== excludeTag) {
        elem.style.opacity = opacity;
      };
    };
  };
