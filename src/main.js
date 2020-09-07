
import { generateMocks } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import { MenuItem, UpdateType, FilterType } from "./consts.js";
import TripListToggleView from "./view/toggleViewListTrip.js";
import { render, RenderPosition } from "./utils/render.js";

const COUNT_RENDER_DAYS_TRIP = 5;
const points = generateMocks(COUNT_RENDER_DAYS_TRIP);

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

new HeaderTripPresenter(points, siteHeaderMainTripContainer, siteHeaderFilterTrip, filterModel, pointsModel).init();
const tripPresenter = new TripPresenter(siteMainContainer, pointsModel, filterModel);
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const siteMenuComponent = new TripListToggleView()

render(siteHeaderFilterTrip, siteMenuComponent, RenderPosition.AFTEREND);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case MenuItem.TABLE:
      tripPresenter.init();

      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
