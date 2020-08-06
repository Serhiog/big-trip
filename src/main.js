import { render } from "./view/util.js";
import { createMajorTripInfoTemplate } from "./view/majorTripInfo.js";
import { createMajorTripCostTemplate } from "./view/majorTripCost.js";
import { createToggleViewListTripTemplate } from "./view/toggleViewListTrip.js";
import { createMainTripFilterTemplate } from "./view/mainTripFilter.js";
import { createTripSortTemplate } from "./view/tripSort.js";
import { createTripEventEditContainerTemplate } from "./view/tripEventEditContainer.js";
import { createTripEditorHeaderTemplate } from "./view/tripEditorHeader.js";
import { createTripEditorDetailsTemplate } from "./view/tripEditorDetails.js";
import { createTripPointsListTemplate } from "./view/tripPointsList.js";
import { createTripPointTemplate } from "./view/tripPoint.js";
import { point } from "./mock/point.js";
import { getRandomInteger } from "./mock/point.js";

const COUNT_RENDER_DAYS_TRIP = 3;

const points = new Array(COUNT_RENDER_DAYS_TRIP).fill().map(point);

const sitePageBodyContent = document.querySelector(`.page-body`);
const siteHeaderContainer = sitePageBodyContent.querySelector(`.page-header`);
const siteHeaderMainTripContainer = siteHeaderContainer.querySelector(`.trip-main`);

render(siteHeaderMainTripContainer, createMajorTripInfoTemplate(), `afterbegin`);
const siteMajorInfoTrip = document.querySelector(`.trip-main__trip-info`);

render(siteMajorInfoTrip, createMajorTripCostTemplate(), `beforeend`);

const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);
const siteHeaderFilterToggleView = siteHeaderFilterTrip.querySelector(`.trip-main__trip-controls h2`);
render(siteHeaderFilterToggleView, createToggleViewListTripTemplate(), `afterEnd`);
render(siteHeaderFilterTrip, createMainTripFilterTemplate(), `beforeend`);

const siteSiteMainContainer = sitePageBodyContent.querySelector(`.page-body__page-main`);
const siteTripConstructor = siteSiteMainContainer.querySelector(`.trip-events h2`);

render(siteTripConstructor, createTripSortTemplate(), `afterend`);
const siteTripSortTemplate = siteSiteMainContainer.querySelector(`.trip-events__trip-sort`);

render(siteTripSortTemplate, createTripEventEditContainerTemplate(), `afterend`);
const siteTripEventEditContainer = siteSiteMainContainer.querySelector(`.trip-events__item`);

render(siteTripEventEditContainer, createTripEditorHeaderTemplate(points), `afterbegin`);

render(siteTripEventEditContainer, createTripEditorDetailsTemplate(points), `beforeend`);

render(siteTripEventEditContainer, createTripPointsListTemplate(points[getRandomInteger(0, points.length - 1)]), `afterend`);
const siteTripListPoints = siteSiteMainContainer.querySelector(`.trip-events__list`);

for (let i = 0; i < COUNT_RENDER_DAYS_TRIP; i++) {
  render(siteTripListPoints, createTripPointTemplate(points[i]), `afterbegin`);
}
