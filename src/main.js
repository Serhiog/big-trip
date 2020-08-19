import { render, RenderPosition } from "./utils/render.js";
import { generateMocks } from "./mock/point.js";
import NoPoints from "./view/no-Points.js";
import PointsPresenter from "./presenter/trip.js";
import MajorTripRouteView from "./view/majorTripInfo.js";
import MajorTripCostView from "./view/majorTripCost.js";
import TripListToggleView from "./view/toggleViewListTrip.js";
import TripFilterView from "./view/mainTripFilter.js";

const COUNT_RENDER_DAYS_TRIP = 3;

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

let arra = []
points.forEach(point => {
  arra.push(point.price)
});


const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
render(siteHeaderMainTripContainer, new MajorTripRouteView(points, tripEndDay).getElement(), RenderPosition.AFTERBEGIN);

const siteMajorInfoTrip = document.querySelector(`.trip-main__trip-info`);
render(siteMajorInfoTrip, new MajorTripCostView(points).getElement(), RenderPosition.BEFOREEND);

const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);
const siteHeaderFilterToggleView = siteHeaderFilterTrip.querySelector(`.trip-main__trip-controls h2`);

render(siteHeaderFilterToggleView, new TripListToggleView().getElement(), RenderPosition.AFTEREND);
render(siteHeaderFilterTrip, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const siteSiteMainContainer = document.querySelector(`.trip-events`);

if (points.length === 0) {
  render(siteSiteMainContainer, new NoPoints().getElement(), RenderPosition.AFTEREND);
} else {
  const TripPresenter = new PointsPresenter(points, groups, tripEndDay, siteSiteMainContainer);
  TripPresenter.init();
}


