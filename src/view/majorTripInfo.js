import { date4User, date4UserEnd } from "./util.js";

export const createMajorTripInfoTemplate = (point, tripEndDay) => {

  let сities = [];
  point.forEach(place => {

    сities.push(place.city)

  });

  let routeCities = сities.join(` — `);

  let { type, city, price, options, startDate, endDate } = point;

  let userDate = date4User(startDate);
  const userTripsEnd = +date4UserEnd(userDate) + tripEndDay;

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam — ${routeCities}</h1>

    <p class="trip-info__dates">${userDate}&nbsp;—&nbsp;${userTripsEnd}</p>
  </div>
</section>`;
};
