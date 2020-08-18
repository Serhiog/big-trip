import { render, RenderPosition } from "./utils/render.js";
import { debounce } from "./utils/common.js"
import { generateMocks } from "./mock/point.js";
import NoPoints from "./view/no-Points.js";
import Abstract from "./view/abstract.js";
import PointsPresenter from "./presenter/trip.js";

const COUNT_RENDER_DAYS_TRIP = 20;


const points = generateMocks(COUNT_RENDER_DAYS_TRIP);
const groups = new Map();

let tripEndDay = 0;

points.forEach((point) => {
  const date = point.startDate.toISOString().split(`T`)[0];
  if (!groups.has(date)) {
    groups.set(date, [point]);
    tripEndDay++;
  } else {
    const items = groups.get(date);
    items.push(point);
  }
});
const TripPresenter = new PointsPresenter(points, groups, tripEndDay);
TripPresenter._renderHeader();
TripPresenter._renderSortDays();
TripPresenter._renderPoints();

//render(siteTripConstructor, new NoPoints().getElement(), RenderPosition.AFTEREND);
