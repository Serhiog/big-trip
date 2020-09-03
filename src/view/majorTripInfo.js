const MAX_CITIES_LIST = 4;

import { date4User, date4UserEnd } from "../utils/dates.js";
import Abstract from "./abstract.js";


export default class MajorTripRouteView extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  createMajorTripInfoTemplate(points) {
    let сities = [];
    points.forEach((place) => {
      сities.push(place.city);
    });

    if (points.length === 0) {
      return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title"></h1>

        <p class="trip-info__dates">&nbsp;&nbsp;</p>
      </div>
    </section>`;
    } else {

      let routeCities = сities.join(` — `);

      if (сities.length >= MAX_CITIES_LIST) {
        routeCities = ( ` ... —` + routeCities.split(`—`)[MAX_CITIES_LIST]);
      }

      const userDate = date4User(points[0].startDate);
      const userTripsEnd = +date4UserEnd(userDate);
      return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam — ${routeCities}</h1>

      <p class="trip-info__dates">${userDate}&nbsp;—&nbsp;${userTripsEnd}</p>
    </div>
  </section>`;
    }
  }

  getTemplate() {
    return this.createMajorTripInfoTemplate(this._points, this._tripEndDay);
  }
}
