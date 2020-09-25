import {date4User} from "../utils/dates.js";
import Abstract from "./abstract.js";

const createTripPointsListTemplate = (date, dayNumber, showDate) => {
  const userDate = showDate ? date4User(date) : ``;

  return `<li class="trip-days__item  day">
            <div div class="day__info">
              <span class="day__counter">${showDate ? dayNumber : ``}</span>
              <time class="day__date" datetime=${date}>${userDate}</time>
            </div>
          </li>
  `;
};

export default class TripPointListView extends Abstract {
  constructor(date, dayNumber, showDate) {
    super();
    this._date = date;
    this._dayNumber = dayNumber;
    this._showDate = showDate;
  }

  getTemplate() {
    return createTripPointsListTemplate(this._date, this._dayNumber, this._showDate);
  }
}
