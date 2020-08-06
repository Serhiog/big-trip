
export const createTripPointTemplate = (points) => {
  const { type,
    cities,
    extras,
    firstDate,
    secondDate,
    result,
  } = points;
  return `<li class="trip-events__item">
  <div class="event">
      <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${(type)}.png"
              alt="Event type icon">
      </div>
      <h3 class="event__title"> ${type} to ${cities}</h3>

      <div class="event__schedule">
          <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30">${firstDate}</time>
              —
              <time class="event__end-time" datetime="2019-03-18T11:00">${secondDate}</time>
          </p>
          <p class="event__duration">${result}</p>
      </div>

      <p class="event__price">
          €&nbsp;<span class="event__price-value">${extras[1]}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
          <li class="event__offer">
              <span class="event__offer-title">${extras[0]}</span>
              +
              €&nbsp;<span class="event__offer-price">${extras[1]}</span>
          </li>
      </ul>

      <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
      </button>
  </div>
</li>`;
};
