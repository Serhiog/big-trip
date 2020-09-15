import PointEditView from "../view/pointEditor.js";
// import { generateId } from "../utils/common.js";
import { remove, render, RenderPosition } from "../utils/render.js";
import { UserAction, UpdateType } from "../consts.js";
import TripPointListView from "../view/tripPointsList.js";
import InnerTripPointList from "../view/innerPointsList.js";

const BLANK_POINT = {
  type: `Flight`,
  city: ``,
  price: ``,
  startDate: new Date(),
  endDate: new Date(),
  options: [],
  isFavorite: false
};

export default class PointNew {
  constructor(pointListContainer, changeData, offers) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._pointEditComponent = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this.tripPointListView = new TripPointListView();
    this.innerTripPointList = new InnerTripPointList();
    this._offers = offers;
  }

  init(point, callback) {
    this._destroyCallback = callback;
    if (this._pointEditComponent !== null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    this._pointEditComponent = new PointEditView(BLANK_POINT, this._offers);
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

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(point, UserAction.ADD_POINT, UpdateType.MINOR);
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

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }
}
