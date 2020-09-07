import PointEditView from "../view/pointEditor.js";
import { generateId } from "../mock/point.js";
import { remove, render, RenderPosition } from "../utils/render.js";
import { UserAction, UpdateType } from "../consts.js";
import TripPointListView from "../view/tripPointsList.js";
import InnerTripPointList from "../view/innerPointsList.js";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._pointEditComponent = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this.tripPointListView = new TripPointListView();
    this.innerTripPointList = new InnerTripPointList();
  }

  init(point, callback) {
    this._destroyCallback = callback;
    if (this._pointEditComponent !== null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    this._pointEditComponent = new PointEditView(point._points[0]);
    this._pointEditComponent.submitPoint(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._destroyCallback = null;

    render(this._pointListContainer, this.tripPointListView, RenderPosition.AFTERBEGIN);
    render(this.tripPointListView, this.innerTripPointList, RenderPosition.BEFOREEND);
    render(this.innerTripPointList, this._pointEditComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MINOR, Object.assign({ id: generateId() }, point));
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
