const DEBOUNCE_INTERVAL = 500;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDate = (date) => {
  return date.toISOString().split(`T`)[1].slice(0, 5);
};


export const msToTime = (durMiliseconds) => {
  let minutes = Math.floor((durMiliseconds / (1000 * 60)) % 60).toFixed();
  minutes <= 0 ? minutes = `` : minutes = minutes + `M `;
  let hours = (Math.floor((durMiliseconds / (1000 * 60 * 60)) % 24)).toFixed();
  hours <= 0 ? hours = `` : hours = hours + `H `;
  let days = Math.floor((durMiliseconds / (1000 * 60 * 60 * 24))).toFixed();
  days <= 0 ? days = `` : days = days + `D `;
  const duration = hours + minutes + days;
  return duration;
};

export const date4User = (date) => {
  return new Date(date).toDateString().slice(4, 10);
};

export const date4UserEnd = (date) => {
  return date.split(` `).join().slice(4, 6);
};

export const tripStartEndDates = (date) => {
  return date.toLocaleDateString().split(`.`).join(`/`);
};

export const formatedStartEndDate = (date) => {
  return tripStartEndDates(date).slice(0, 5) + `/` + date.getUTCFullYear().toString().slice(2, 4);
};

export const debounce = (cb) => {
  const cardClose = document.querySelector('.popup__close');
  if (cardClose) {
    cardClose.removeEventListener('click', window.cardClose.byClick);
    document.removeEventListener('keydown', window.cardClose.byKeyDown);
  }
  let lastTimeout = null;

  return function () {
    const parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
