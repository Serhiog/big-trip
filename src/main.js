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
import { generateMocks } from "./mock/point.js";
import { createTripEditTemplate } from "./mock/pointEditor.js";

const COUNT_RENDER_DAYS_TRIP = 3;

const point = generateMocks(COUNT_RENDER_DAYS_TRIP);
const groups = new Map();

let tripEndDay = 0;
point.forEach((point) => {
  const date = point.startDate.toISOString().split('T')[0];
  if (!groups.has(date)) {
    groups.set(date, [point]);
    tripEndDay++;
  } else {
    const items = groups.get(date);
    items.push(point)
  }
});


const sitePageBodyContent = document.querySelector(`.page-body`);
const siteHeaderContainer = sitePageBodyContent.querySelector(`.page-header`);
const siteHeaderMainTripContainer = siteHeaderContainer.querySelector(`.trip-main`);

render(siteHeaderMainTripContainer, createMajorTripInfoTemplate(point, tripEndDay), `afterbegin`);
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

// render(siteTripSortTemplate, createTripEventEditContainerTemplate(), `afterend`);
// const siteTripEventEditContainer = siteSiteMainContainer.querySelector(`.trip-events__item`);


// render(siteTripEventEditContainer, createTripEditorHeaderTemplate(point), `afterbegin`);


// render(siteTripEventEditContainer, createTripEditorDetailsTemplate(point), `beforeend`);

render(siteTripSortTemplate, `<ul class="trip-days"><ul/>`, `afterend`)
const tripDaysContainer = siteSiteMainContainer.querySelector('.trip-days');

let dayNumber = 1;

for (let group of groups.entries()) {
  render(tripDaysContainer, createTripPointsListTemplate(group, dayNumber), `beforeend`);
  dayNumber++;
}

let tyt

for (let group of groups.entries()) {
  tyt = group
}

const renderPointEditor = (evt) => {
  const pointCommonContainer = evt.target.parentNode.parentNode;
  const pointContainer = evt.target.parentNode;
  pointContainer.classList.add(`visually-hidden`);

  render(pointCommonContainer, createTripEditTemplate(tyt), `afterbegin`);

  const closeBtn = pointCommonContainer.querySelector(`.event__rollup-btn`);
  closeBtn.addEventListener(`click`, function () {
    pointCommonContainer.querySelector(`.event--edit`).remove();
    pointContainer.classList.remove(`visually-hidden`)
  });
}

const eventOpenBtns = document.querySelectorAll(`.event__rollup-btn`);
eventOpenBtns.forEach(btn => {
  btn.addEventListener(`click`, renderPointEditor);
});

