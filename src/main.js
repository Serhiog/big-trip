
import { generateMocks } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";

const COUNT_RENDER_DAYS_TRIP = 5;
const points = generateMocks(COUNT_RENDER_DAYS_TRIP);

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

new HeaderTripPresenter(points, siteHeaderMainTripContainer, siteHeaderFilterTrip, filterModel, pointsModel).init();
new TripPresenter(siteMainContainer, pointsModel, filterModel).init();
