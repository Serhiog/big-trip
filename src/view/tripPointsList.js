import {createTripPointTemplate} from "./tripPoint.js";
import {date4User} from "./util.js";

export const createTripPointsListTemplate = (group, dayNumber) => {

  let [date, points] = group;
  let userDate = date4User(date);

  let html = ``;
  points.forEach((point) => {
    html += createTripPointTemplate(point);
  });

  return `
  <li class="trip-days__item  day">
      <div class="day__info">
          <span class="day__counter">${dayNumber}</span>
          <time class="day__date" datetime=${date}>${userDate}</time>
      </div>

      <ul class="trip-events__list">
      ${html}
      </ul>
  </li>
`;
};
