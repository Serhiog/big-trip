
import { generateMocks } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import StatisticsView from "./view/statistics.js";
import { render, RenderPosition } from "./utils/render.js";
import Api from "./api.js";

const COUNT_RENDER_DAYS_TRIP = 5;

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;
const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints().then((tasks) => {
  console.log(tasks);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const points = generateMocks(COUNT_RENDER_DAYS_TRIP);

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
pointsModel.setPoints(points);
console.log(pointsModel.getPoints());
const tripPresenter = new TripPresenter(siteMainContainer, pointsModel, filterModel);
const headerPresenter = new HeaderTripPresenter(points, siteHeaderMainTripContainer, siteHeaderFilterTrip, filterModel, pointsModel, tripPresenter);

// render(siteMainContainer, new StatisticsView(pointsModel.getPoints()), RenderPosition.AFTEREND);
tripPresenter.init();
headerPresenter.init();
headerPresenter.initStats();
headerPresenter.initStartFilter();

