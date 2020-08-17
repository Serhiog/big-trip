
import { date4User, createElement } from "./util.js";

export default class TripPointListView {
  constructor(group, dayNumber) {
    this._group = group;
    this._dayNumber = dayNumber;
    this._element = null;
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
    return new TripPointListView().createTripPointsListTemplate(this._group, this._dayNumber);
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
