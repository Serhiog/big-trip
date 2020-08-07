
import { humanizeTaskDueDateView } from "./util.js";
import { humanizeTaskDueDateRobot } from "./util.js";

export const createTripPointTemplate = (points) => {
  let { type, cities, extrasServices, finalPrices, timeStart, timeEnd } = points;

  let t1 = humanizeTaskDueDateView(timeStart);
  let t2 = humanizeTaskDueDateView(timeEnd);
  let t3 = humanizeTaskDueDateRobot(timeStart);
  let t4 = humanizeTaskDueDateRobot(timeEnd);

  let firstDate = t1;
  let secondDate = t2;

  let getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);
  let different = (getDate(secondDate) - getDate(firstDate));

  let hours = Math.floor((different % 86400000) / 3600000);
  let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
  let result = hours + `H ` + minutes + `M `;



  return `<li class="trip-events__item">
  <div class="event">
      <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png"
              alt="Event type icon">
      </div>
      <h3 class="event__title"> ${type} to ${cities}</h3>

      <div class="event__schedule">
          <p class="event__time">
              <time class="event__start-time" datetime=${t3}>${t1}</time>
              —
              <time class="event__end-time" datetime=${t4}>${t2}</time>
          </p>
          <p class="event__duration">${result}</p>
      </div>

      <p class="event__price">

          ${!extrasServices.length ? `` : `€&nbsp;`}<span class="event__price-value">${!extrasServices.length ? `` : finalPrices}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
          <li class="event__offer">
              <span class="event__offer-title">${extrasServices}</span>
              ${!extrasServices.length ? `` :
      `<span class="event__offer-symbol">
              +
              €&nbsp;

              </span>`}
              <span class="event__offer-price">${!extrasServices.length ? `` : finalPrices} </span >
          </li >
      </ul >

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
  </div >
</li > `;
};
