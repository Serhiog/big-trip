const MAX_CITIES_LIST = 4;

import { date4User, date4UserEnd } from "../utils/dates.js";
import Abstract from "./abstract.js";
import { compare } from "../utils/filter.js";


export default class MajorTripRouteView extends Abstract {
  constructor(points) {
    super();
    this._points = points;
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

    const sortedStartDatePoints = points.slice().sort(compare);


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

    if (!sortedStartDatePoints.length) {
      return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);

    } else {
      userDate = date4User(sortedStartDatePoints[0].startDate);
      userTripsEnd = date4UserEnd(date4User(sortedStartDatePoints[sortedStartDatePoints.length - 1].endDate));
      if (sortedStartDatePoints.length === 1) {
        route = sortedStartDatePoints[0].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (sortedStartDatePoints.length === 2) {
        route = sortedStartDatePoints[0].city + `  —  ` + sortedStartDatePoints[1].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (sortedStartDatePoints.length === 3) {
        route = sortedStartDatePoints[0].city + `  —  ` + sortedStartDatePoints[1].city + `  —  ` + sortedStartDatePoints[2].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (sortedStartDatePoints.length >= 4) {
        route = sortedStartDatePoints[0].city + `  —  ... —  ` + sortedStartDatePoints[sortedStartDatePoints.length - 1].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);

      }
    }
  }

  getTemplate() {
    return this.createMajorTripInfoTemplate(this._points);
  }
}
