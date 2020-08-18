const DEBOUNCE_INTERVAL = 500;

export const debounce = (cb) => {
  const cardClose = document.querySelector(`.popup__close`);
  if (cardClose) {
    cardClose.removeEventListener(`click`, window.cardClose.byClick);
    document.removeEventListener(`keydown`, window.cardClose.byKeyDown);
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
