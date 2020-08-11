
import { humanizeTaskDueDate } from "./util.js";


export const createTripPointTemplate = (point) => {
  const MAX_COUNT_OPTIONS = 3;
  let { type, city, price, options, startDate, endDate } = point;

  const t1 = humanizeTaskDueDate(startDate)
  const t2 = humanizeTaskDueDate(endDate)

  let optionsHtml = '';

  let isEmptyOptions = false;

  if (!point.options.length) {
    isEmptyOptions = true;
  }

  options.slice(0, MAX_COUNT_OPTIONS).forEach((option) => {
    optionsHtml += `
        <li class="event__offer">
              <span class="event__offer-title">${option[0]}</span>
               + €&nbsp;
               <span class="event__offer-price">${option[1]}</span>
          </li >
    `;
  });

  let durMilisecunds = endDate.getTime() - startDate.getTime()
  const msToTime = (durMilisecunds) => {
    let minutes = Math.floor((durMilisecunds / (1000 * 60)) % 60);
    let hours = Math.floor((durMilisecunds / (1000 * 60 * 60)) % 24);

    return (hours + "H " + minutes + "M")
  }
  let duration = msToTime(durMilisecunds);

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
          <p class="event__duration">${duration}</p>
      </div>
${isEmptyOptions === false ?
      `<p class="event__price">
          € <span class="event__price-value">${price}</span>
      </p>` : ``}
<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${optionsHtml}
  </ul>

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
  </div >
</li > `;
};
