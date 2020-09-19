const MAX_CITIES_LIST = 4;

import { date4User, date4UserEnd } from "../utils/dates.js";
import Abstract from "./abstract.js";


export default class MajorTripRouteView extends Abstract {
  constructor(points, sortedPoints) {
    super();
    this._points = points;
    this._pointsSorted = sortedPoints;
  }

  createMajorTripInfoTemplate(points) {
    let сities = [];
    points.forEach((place) => {
      сities.push(place.destination.name);
    });

    if (!this._pointsSorted.length) {
      return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title"></h1>
        <p class="trip-info__dates">&nbsp;&nbsp;</p>
      </div>
    </section>`;
    } else {
      const userDate = date4User(this._pointsSorted[0][0].startDate);
      const userTripsEnd = date4UserEnd(date4User(this._pointsSorted[this._pointsSorted.length - 1][0].endDate));
      return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${this._pointsSorted[0][0].city} — ${this._pointsSorted.length > 3 ? `...` : this._pointsSorted[1][0].city} — ${this._pointsSorted[this._pointsSorted.length - 1][0].city}</h1>

      <p class="trip-info__dates">${userDate}&nbsp;—&nbsp;${userTripsEnd}</p>
    </div>
  </section>`;
    }
  }

  getTemplate() {
    return this.createMajorTripInfoTemplate(this._points, this._tripEndDay);
  }
}
