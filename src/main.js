import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import Api from "./api.js";
import {UpdateType} from "./consts.js";

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);


const filterModel = new FilterModel();
const pointsModel = new PointsModel();

api.getDestinations().then((destinations) => {
  api.getOffers().then((offers) => {
    api.getPoints().then((points) => {
      pointsModel.setPoints(UpdateType.INIT, points);
    }).catch(() => {
      pointsModel.setPoints(UpdateType.INIT, []);
    });
    const tripPresenter = new TripPresenter(siteMainContainer, pointsModel, filterModel, api, offers, destinations, siteHeaderMainTripContainer, siteHeaderFilterTrip);
    tripPresenter.init();
    tripPresenter.initHeader(siteHeaderMainTripContainer, siteHeaderFilterTrip, siteMainContainer, filterModel, pointsModel, tripPresenter);
  });
});
