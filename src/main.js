import { render, RenderPosition } from "./utils/render.js";
import { debounce } from "./utils/common.js"
import MajotTripRouteView from "./view/majorTripInfo.js";
import MajorTripCostView from "./view/majorTripCost.js";
import TripListToggleView from "./view/toggleViewListTrip.js";
import TripFilterView from "./view/mainTripFilter.js";
import TripSortView from "./view/tripSort.js";
import TripsContainerView from "./view/tripsContainer.js";
import TripPointListView from "./view/tripPointsList.js";
import PointView from "./view/tripPoint.js";
import { generateMocks } from "./mock/point.js";
import PointEditView from "./view/pointEditor.js";
import NoPoints from "./view/no-Points.js";
import Abstract from "./view/abstract.js";

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

// -----------------------------------------------------

const renderPoint = (pointsContainer, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point, points);

  const replacePointToEdit = () => {
    pointsContainer.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    pointComponent.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, replacePointToEdit);
    pointEditComponent.setEditClickHandler(debounce(replaceEditToForm))
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEditToForm = () => {
    pointsContainer.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    pointEditComponent.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, replaceEditToForm);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceEditToForm();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(debounce(replacePointToEdit));

  render(pointsContainer, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

let dayNumber = 1;

for (let group of groups.entries()) {
  const tripPointListElement = new TripPointListView(group, dayNumber).getElement();

  render(tripDaysContainer, tripPointListElement, RenderPosition.BEFOREEND);
  dayNumber++;
  group[1].forEach(point => {
    const pointsContainer = tripPointListElement.querySelector(`.trip-events__list`);
    renderPoint(pointsContainer, point);
  });
}

//render(siteTripConstructor, new NoPoints().getElement(), RenderPosition.AFTEREND);
