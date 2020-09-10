import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      ...this._points,
      update
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        endDate: point.date_to,
        startDate: point.date_from,
        options: point.offers,
        price: point.base_price,
        type: point.type[0].toUpperCase() + point.type.slice(1),
        isFavorite: point.is_favorite,
        id: +point.id,
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.date_to;
    delete adaptedPoint.date_from;
    delete adaptedPoint.offers;
    delete adaptedPoint.base_price;
    // delete adaptedPoint.type;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        "date_to": point.endDate,
        "date_from": point.startDate,
        "offers": point.options,
        "base_price": point.price,
        "type": point.type,
        "is_favorite": point.isFavorite,
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.dueDate;
    delete adaptedPoint.isArchive;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.repeating;

    return adaptedPoint;
  }
}
