
import TripPointListView from "../view/trip-points-list.js";
import InnerTripPointList from "../view/innerPointsList.js";
import PointPresenter from './point.js';
import {render, RenderPosition, remove} from "../utils/render.js";

export default class GroupPresenter {
  constructor(container, changeData, modeChange, points, offers, destinations) {
    this._container = container;
    this._pointPresenter = {};
    this._modeChange = modeChange;
    this._changeData = changeData;
    this._handlePointChange = this._handlePointChange.bind(this);
    this.points = points;
    this.pointsLength = points.length;
    this._offers = offers;
    this._destinations = destinations;
  }

  init(points, dayNumber, showDate) {
    this.dayNumber = dayNumber;
    this._tripPointListElement = new TripPointListView(points[0].startDate, dayNumber, showDate);
    render(this._container, this._tripPointListElement, RenderPosition.BEFOREEND);
    this._innerTripPointList = new InnerTripPointList();
    render(this._tripPointListElement, this._innerTripPointList, RenderPosition.BEFOREEND);

    points.forEach((point) => {
      this._pointPresenter[point.id] = new PointPresenter(this._innerTripPointList, this._modeChange, this._handlePointChange, points, this._offers, this._destinations);
      this._pointPresenter[point.id].init(point);
    });
  }

  _handlePointChange(updatedPoint, userAction, updateType) {
    this._changeData(updatedPoint, userAction, updateType, this.dayNumber);
  }

  getPointPresenter(point) {
    this._pointPresenter[point.id].init(point);
  }

  destroy() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    remove(this._innerTripPointList);
    remove(this._tripPointListElement);
    this._pointPresenter = {};
  }

  resetView() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  setViewState(point, state, newBtnSaveName) {
    this._pointPresenter[point.id].setViewState(state, newBtnSaveName);
  }

  setSaveBtnName(newBtnName) {
    return newBtnName;
  }

}
