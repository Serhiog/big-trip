import { createTripPointTemplate } from "./tripPoint.js";

export const createTripPointsListTemplate = (group, dayNumber) => {
  let [date, points] = group;

  let date4User = new Date(date).toDateString().slice(4, 10);

  let html = '';
  points.forEach(point => {
    html += createTripPointTemplate(point);
  });

  return `
  <li class="trip-days__item  day">
      <div class="day__info">
          <span class="day__counter">${dayNumber}</span>
          <time class="day__date" datetime=${date}>${date4User}</time>
      </div>

      <ul class="trip-events__list">
      ${html}
      </ul>
  </li>
`;
};
