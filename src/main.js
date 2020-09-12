
// import { generateMocks } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatisticsView from "./view/statistics.js";
import { render, RenderPosition } from "./utils/render.js";
import Api from "./api.js";
import { UpdateType } from "./consts.js";

// const COUNT_RENDER_DAYS_TRIP = 5;

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

// const points = generateMocks(COUNT_RENDER_DAYS_TRIP);

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
// pointsModel.setPoints(points);

api.getPoints().then((points) => {
  pointsModel.setPoints(UpdateType.INIT, points);
}).catch((error) => {
  pointsModel.setPoints(UpdateType.INIT, []);
});

const tripPresenter = new TripPresenter(siteMainContainer, pointsModel, filterModel, api);
const headerPresenter = new HeaderTripPresenter(siteHeaderMainTripContainer, siteHeaderFilterTrip, filterModel, pointsModel, tripPresenter);

// render(siteMainContainer, new StatisticsView(pointsModel), RenderPosition.AFTEREND);
tripPresenter.init();
// headerPresenter.init();
