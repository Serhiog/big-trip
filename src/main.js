import {render} from "./view/util.js";
import {createMajorTripInfoTemplate} from "./view/majorTripInfo.js";
import {createMajorTripCostTemplate} from "./view/MajorTripCost.js";
import {createToggleViewListTripTemplate} from "./view/toggleViewListTrip.js";
import {createMainTripFilterTemplate} from "./view/mainTripFilter.js";
import {createTripSortTemplate} from "./view/tripSort.js";
import {createTripEventEditContainerTemplate} from "./view/tripEventEditContainer.js";
import {createTripEditorHeaderTemplate} from "./view/tripEditorHeader.js";
import {createTripEditorDetailsTemplate} from "./view/tripEditorDetails.js";
import {createTripPointsListTemplate} from "./view/tripPointsList.js";
import {createTripDayTemplate} from "./view/tripDay.js";

const COUNT_RENDER_DAYS_TRIP = 3;

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

render(siteTripEventEditContainer, createTripEditorHeaderTemplate(), `afterbegin`);

render(siteTripEventEditContainer, createTripEditorDetailsTemplate(), `beforeend`);

render(siteTripEventEditContainer, createTripPointsListTemplate(), `afterend`);
const siteTripListPoints = siteSiteMainContainer.querySelector(`.trip-days`);

for (let i = 0; i < COUNT_RENDER_DAYS_TRIP; i++) {
  render(siteTripListPoints, createTripDayTemplate(), `afterbegin`);
}