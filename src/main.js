
import { generateMocks } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatisticsView from "./view/statistics.js";


const COUNT_RENDER_DAYS_TRIP = 5;
const points = generateMocks(COUNT_RENDER_DAYS_TRIP);

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

// render(siteMainElement, new StatisticsView(tasksModel.getTasks()), RenderPosition.BEFOREEND);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const tripPresenter = new TripPresenter(siteMainContainer, pointsModel, filterModel);
const headerPresenter = new HeaderTripPresenter(points, siteHeaderMainTripContainer, siteHeaderFilterTrip, filterModel, pointsModel, tripPresenter);

tripPresenter.init();
headerPresenter.init();
headerPresenter.initStats();
headerPresenter.initStartFilter();

