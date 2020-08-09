
import { humanizeTaskDueDateView, humanizeTaskDueDateRobot } from "./util.js";
import { getRandomInteger } from "../mock/point.js";

export const createTripPointTemplate = (points) => {
  let { type, cities, finalServices, finalPrices } = points;

  let randomNumber = getRandomInteger(0, finalServices.length)

  let userServices = finalServices.slice(0, randomNumber)
  let userPrices = finalPrices.slice(0, randomNumber)
  let countOfPrices = 0;
  userPrices.forEach(price => {
    countOfPrices = countOfPrices + price;
  });


  const generateDate = (date) => {
    return new Date(date.getTime() + getRandomInteger(1, 30) * 60 * 60 * 1000);
  }

  const time1 = generateDate(new Date());
  const time2 = generateDate(time1);


  let timeDateStart = humanizeTaskDueDateView(time1);
  let timeDateEnd = humanizeTaskDueDateView(time2);
  let timeDateRobotStart = humanizeTaskDueDateRobot(time1);
  let timeDateRobotEnd = humanizeTaskDueDateRobot(time1);


  return `<li class="trip-events__item">
  <div class="event">
      <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png"
              alt="Event type icon">
      </div>
      <h3 class="event__title"> ${type} to ${cities}</h3>

      <div class="event__schedule">
          <p class="event__time">
              <time class="event__start-time" datetime=${timeDateRobotStart}>${timeDateStart}</time>
              —
              <time class="event__end-time" datetime=${timeDateRobotEnd}>${timeDateEnd}</time>
          </p>
          <p class="event__duration"></p>
      </div>

      <p class="event__price">

          ${!userServices.length ? `` : `€&nbsp;`}<span class="event__price-value">${!userServices.length ? `` : countOfPrices}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
          <li class="event__offer">
              <span class="event__offer-title">${userServices}</span>
              ${!userServices.length ? `` :
      `<span class="event__offer-symbol">
              +
              €&nbsp;

              </span>`}
              <span class="event__offer-price">${!userServices.length ? `` : countOfPrices} </span >
          </li >
      </ul >

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
  </div >
</li > `;
};
