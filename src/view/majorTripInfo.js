const MAX_CITIES_LIST = 4;

import { date4User, date4UserEnd, createElement } from "./util.js";

export default class MajotTripRouteView {
  constructor(points, tripEndDay) {
    this._points = points;
    this._tripEndDay = tripEndDay;
    this._element = null;
  }

  createMajorTripInfoTemplate(points, tripEndDay) {
    let сities = [];
    points.forEach((place) => {
      сities.push(place.city);
    });

    let routeCities = сities.join(` — `);

    if (сities.length >= MAX_CITIES_LIST) {
      routeCities = `... — ` + сities[сities.length - 1];
    }

    let userDate = date4User(points[0].startDate);
    const userTripsEnd = +date4UserEnd(userDate) + tripEndDay;
    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam — ${routeCities}</h1>

      <p class="trip-info__dates">${userDate}&nbsp;—&nbsp;${userTripsEnd}</p>
    </div>
  </section>`;
  }

  getTemplate() {
    return this.createMajorTripInfoTemplate(this._points, this._tripEndDay);
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
