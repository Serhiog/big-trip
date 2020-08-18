
import { date4User } from "../utils/dates.js";
import Abstract from "./abstract.js";

export default class TripPointListView extends Abstract {
  constructor(group, dayNumber) {
    super()
    this._group = group;
    this._dayNumber = dayNumber;
  }

  createTripPointsListTemplate(group, dayNumber) {
    let [date] = group;
    let userDate = date4User(date);

    return `<li class="trip-days__item  day">
      <div div class="day__info" >
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime=${date}>${userDate}</time>
        </div >

      <ul class="trip-events__list">
      </ul>
    </li >
      `;
  }

  getTemplate() {
    return this.createTripPointsListTemplate(this._group, this._dayNumber);
  }
}
