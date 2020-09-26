import {date4User, date4UserEnd} from "../utils/dates.js";
import Abstract from "./abstract.js";
import {compare} from "../utils/filter.js";
import {countCities} from "../consts.js";


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
  </section> `;
  }

  createMajorTripInfoTemplate(points) {
    const sortedStartDatePoints = points.slice().sort(compare);

    let totalPrice = 0;
    points.forEach((point) => {
      totalPrice += +point.price;
      point.options.forEach((element) => {
        totalPrice += +element.price;
      });
    });
    const сities = [];
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
      const lastPoint = sortedStartDatePoints[sortedStartDatePoints.length - 1];
      if (sortedStartDatePoints[sortedStartDatePoints.length - 1].endDate.getMonth() !== sortedStartDatePoints[0].startDate.getMonth()) {
        userTripsEnd = date4User(lastPoint.endDate);
      } else {
        userTripsEnd = date4UserEnd(date4User(lastPoint.endDate));
      }
      if (sortedStartDatePoints.length === countCities.ONE_CITY) {
        route = sortedStartDatePoints[0].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (sortedStartDatePoints.length === countCities.TWO_CITY) {
        route = sortedStartDatePoints[0].city + `  —  ` + sortedStartDatePoints[1].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (sortedStartDatePoints.length === countCities.THREE_CITY) {
        route = sortedStartDatePoints[0].city + `  —  ` + sortedStartDatePoints[1].city + `  —  ` + sortedStartDatePoints[2].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);
      } if (sortedStartDatePoints.length >= countCities.FOUR_CITY) {
        route = sortedStartDatePoints[0].city + `  —  ... —  ` + sortedStartDatePoints[sortedStartDatePoints.length - 1].city;
        return this._routeTemplate(route, userDate, userTripsEnd, totalPrice);

      }
    }
    return true;
  }

  getTemplate() {
    return this.createMajorTripInfoTemplate(this._points);
  }
}
