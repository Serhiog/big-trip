import { nanoid } from "nanoid";
import PointsModel from "../model/points.js";

const getSyncedPoints = (items) => {
  return items.filter(({ success }) => success)
    .map(({ payload }) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getPoints() {
    if (Provider.isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setItems(items);
          return points;
        });
    }

    const storepoints = Object.values(this._store.getItems());

    return Promise.resolve(storepoints.map(PointsModel.adaptToClient));
  }
  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          // const items = createStoreStructure(destinations.map(PointsModel.adaptToServer));
          // this._store.setItems(items);
          return destinations;
        });
    }

    const storepoints = Object.values(this._store.getItems());

    return Promise.resolve(storepoints.map(PointsModel.adaptToClient));
  }
  getOffers() {
    if (Provider.isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          // const items = createStoreStructure(offers.map(PointsModel.adaptToServer));
          // this._store.setItems(items);
          return offers;
        });
    }

    const storepoints = Object.values(this._store.getItems());

    return Promise.resolve(storepoints.map(PointsModel.adaptToClient));
  }

  updatePoint(point) {
    if (Provider.isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedpoint) => {
          this._store.setItem(updatedpoint.id, PointsModel.adaptToServer(updatedpoint));
          return updatedpoint;
        });
    }

    this._store.setItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addpoint(point) {
    if (Provider.isOnline()) {
      return this._api.addPoint(point)
        .then((newpoint) => {
          this._store.setItem(newpoint.id, PointsModel.adaptToServer(newpoint));
          return newpoint;
        });
    }

    // На случай локального создания данных мы должны сами создать `id`.
    // Иначе наша модель будет не полной, и это может привнести баги
    const localNewpointId = nanoid();
    const localNewpoint = Object.assign({}, point, { id: localNewpointId });

    this._store.setItem(localNewpoint.id, PointsModel.adaptToServer(localNewpoint));

    return Promise.resolve(localNewpoint);
  }

  deletePoint(point) {
    if (Provider.isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._store.removeItem(point.id));
    }

    this._store.removeItem(point.id);

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          // Забираем из ответа синхронизированные задачи
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент.
          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
