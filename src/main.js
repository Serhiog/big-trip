import { renderTemplate, render, RenderPosition } from "./view/util.js";
import MajotTripRouteView from "./view/majorTripInfo.js";
import MajorTripCostView from "./view/majorTripCost.js";
import TripListToggleView from "./view/toggleViewListTrip.js";
import TripFilterView from "./view/mainTripFilter.js";
import TripSortView from "./view/tripSort.js";
import TripsContainerView from "./view/tripsContainer.js";
import TripPointListView from "./view/tripPointsList.js";
import { generateMocks } from "./mock/point.js";
import { createTripEditTemplate } from "./view/pointEditor.js";

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


const sitePageBodyContent = document.querySelector(`.page-body`);
const siteHeaderContainer = sitePageBodyContent.querySelector(`.page-header`);
const siteHeaderMainTripContainer = siteHeaderContainer.querySelector(`.trip-main`);

render(siteHeaderMainTripContainer, new MajotTripRouteView(points, tripEndDay).getElement(), RenderPosition.AFTERBEGIN);

const siteMajorInfoTrip = document.querySelector(`.trip-main__trip-info`);

render(siteMajorInfoTrip, new MajorTripCostView(points).getElement(), RenderPosition.BEFOREEND);

const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);
const siteHeaderFilterToggleView = siteHeaderFilterTrip.querySelector(`.trip-main__trip-controls h2`);

render(siteHeaderFilterToggleView, new TripListToggleView().getElement(), RenderPosition.AFTEREND);

render(siteHeaderFilterTrip, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const siteSiteMainContainer = sitePageBodyContent.querySelector(`.page-body__page-main`);
const siteTripConstructor = siteSiteMainContainer.querySelector(`.trip-events h2`);

render(siteTripConstructor, new TripSortView().getElement(), `afterend`);
const siteTripSortTemplate = siteSiteMainContainer.querySelector(`.trip-events__trip-sort`);

render(siteTripSortTemplate, new TripsContainerView().getElement(), RenderPosition.AFTEREND);
const tripDaysContainer = siteSiteMainContainer.querySelector(`.trip-days`);

let dayNumber = 1;
for (let group of groups.entries()) {
  render(tripDaysContainer, new TripPointListView(group, dayNumber).getElement(), RenderPosition.AFTERBEGIN);
  dayNumber++;
}

const renderPointEditor = (evt) => {
  const pointCommonContainer = evt.target.parentNode.parentNode;
  const pointContainer = evt.target.parentNode;
  pointContainer.classList.add(`visually-hidden`);
  const index = evt.target.dataset.index;
  renderTemplate(pointCommonContainer, createTripEditTemplate(points[index], points), `afterbegin`);
  const closeBtn = pointCommonContainer.querySelector(`.event__rollup-btn`);
  closeBtn.addEventListener(`click`, function () {
    pointCommonContainer.querySelector(`.event--edit`).remove();
    pointContainer.classList.remove(`visually-hidden`);
  });
};

const eventOpenBtns = [...document.querySelectorAll(`.event__rollup-btn`)];
eventOpenBtns.forEach((btn) => {
  btn.addEventListener(`click`, renderPointEditor);
});
