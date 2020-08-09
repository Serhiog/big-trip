
import { humanizeTaskDueDateView, humanizeTaskDueDateRobot } from "./util.js";

export const createTripPointsListTemplate = (points) => {
  let { timeStart } = points;


  // let beginTime = humanizeTaskDueDateRobot(timeStart);

  return `<ul class="trip-days">
  <li class="trip-days__item  day">
      <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime=>Mar 25</time>
      </div>

      <ul class="trip-events__list">
      </ul>
  </li>
</ul>`;
};
