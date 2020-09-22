const MAX_CITIES_LIST = 4;

import { date4User, date4UserEnd } from "../utils/dates.js";
import Abstract from "./abstract.js";

export default class MajorTripRouteView extends Abstract {
  constructor(points, sortedPoints) {
    super();
    this._points = points;
    this._pointsSorted = sortedPoints;
  }

  _routeTemplate(route, userDate, userTripsEnd, totalPrice) {
    return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1 >

      <p class="trip-info__dates">${userDate}${route === `` ? `` : `&nbsp;—&nbsp;`}${userTripsEnd}</p>
    </div >
      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
  </section > `;
  }


  createMajorTripInfoTemplate(points) {
    let totalPrice = 0;
    points.forEach((point) => {
      totalPrice += point.price;
      point.options.forEach(element => {
        totalPrice += element.price;
      });
    });
    let сities = [];
    points.forEach((place) => {
      сities.push(place.destination.name);
    });


    let userDate = ``;
    let userTripsEnd = ``;
    let route = ``;
    console.log(this._pointsSorted);
    if (!this._pointsSorted.length) {
      return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);

    } else {

      let sortedPoints = this._pointsSorted[0];
      userDate = date4User(this._pointsSorted[0][0].startDate);
      userTripsEnd = date4UserEnd(date4User(this._pointsSorted[0][this._pointsSorted[0].length - 1].endDate));
      if (this._pointsSorted[0].length === 1) {
        route = this._pointsSorted[0][0].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (this._pointsSorted[0].length === 2) {
        route = this._pointsSorted[0][0].city + `  —  ` + this._pointsSorted[0][1].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (this._pointsSorted[0].length === 3) {
        route = this._pointsSorted[0][0].city + `  —  ` + this._pointsSorted[0][1].city + `  —  ` + this._pointsSorted[0][2].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (this._pointsSorted[0].length >= 4) {
        route = this._pointsSorted[0][0].city + `  —  ... —  ` + this._pointsSorted[0][this._pointsSorted[0].length - 1].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);

      }
    }
  }

  getTemplate() {
    return this.createMajorTripInfoTemplate(this._points);
  }
}
