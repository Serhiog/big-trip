
import { date4User } from "../utils/dates.js";
import Abstract from "./abstract.js";

const innerListPointsTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};

const createTripPointsListTemplate = (group, dayNumber) => {

  const innerListPoints = innerListPointsTemplate();
  let [date] = group;
  let userDate = date4User(date);
  if (group === ``) {
    userDate = ``;
  }

  return `<li class="trip-days__item  day">
    <div div class="day__info" >
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime=${date}>${userDate}</time>
      </div >
${innerListPoints}
  </li >
    `;
}

export default class TripPointListView extends Abstract {
  constructor(group = ``, dayNumber = ``) {
    super();
    this._group = group;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return createTripPointsListTemplate(this._group, this._dayNumber);
  }
}
