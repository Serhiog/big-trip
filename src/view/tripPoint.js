
import { humanizeTaskDueDate, msToTime, createElement } from "./util.js";

const createTripPointTemplate = (point) => {

  const MAX_COUNT_OPTIONS = 3;
  let { type, city, price, options, startDate, endDate, id } = point;

  let durMiliseconds = endDate.getTime() - startDate.getTime();
  let duration = msToTime(durMiliseconds);

  const t1 = humanizeTaskDueDate(startDate);
  const t2 = humanizeTaskDueDate(endDate);

  let optionsHtml = ``;

  let totalPrice = 0;
  options.slice(0, MAX_COUNT_OPTIONS).forEach((option) => {
    totalPrice += option[1];
    optionsHtml += `
        <li class="event__offer">
              <span class="event__offer-title">${option[0]}</span>
               + €&nbsp;
               <span class="event__offer-price">${option[1]}</span>
          </li >
    `;
  });

  return `<li class="trip-events__item">
  <div class="event">
      <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png"
              alt="Event type icon">
      </div>
      <h3 class="event__title"> ${type} to ${city}</h3>

      <div class="event__schedule">
          <p class="event__time">
              <time class="event__start-time" datetime=${startDate}>${t1}</time>
              —
              <time class="event__end-time" datetime=${endDate}>${t2}</time>
          </p>
          <p class="event__duration">${duration}</p >
      </div>


      <p class="event__price">
          € <span class="event__price-value">${price}</span>
      </p>

<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${optionsHtml}
  </ul>

  <button class="event__rollup-btn" type="button" data-index=${id}>
    <span class="visually-hidden">Open event</span>
  </button>
  </div >
</li > `;
};

export default class PointView {
  constructor(point) {

    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createTripPointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
