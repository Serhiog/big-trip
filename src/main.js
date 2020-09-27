import TripPresenter from "./presenter/trip.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import Api from "./api/index.js";
import { UpdateType } from "./consts.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();

const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const setData = (points, destinations, offers) => {
  const tripPresenter = new TripPresenter(siteMainContainer, pointsModel, filterModel, apiWithProvider, offers, destinations, siteHeaderMainTripContainer, siteHeaderFilterTrip);
  tripPresenter.init();
  tripPresenter.initHeader(siteHeaderMainTripContainer, siteHeaderFilterTrip, siteMainContainer, filterModel, pointsModel, tripPresenter, store);
  pointsModel.setPoints(UpdateType.INIT, points);
};

const getDestinations = new Promise((resolve) => {
  apiWithProvider.getDestinations().then((destinations) => {
    resolve(destinations);
  });
});

const getOffers = new Promise((resolve) => {
  apiWithProvider.getOffers().then((offers) => {
    resolve(offers);
  });
});

const getPoints = new Promise((resolve) => {
  apiWithProvider.getPoints().then((points) => {
    resolve(points);
  });
});

Promise.all([getDestinations, getOffers, getPoints])
  .then((data) => {
    setData(data[2], data[0], data[1]);
  })
  .catch((error) => console.error(error)); // eslint-disable-line no-console

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line no-console
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line no-console
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
