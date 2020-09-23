import PointEditView from "../view/pointEditor.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../consts.js";
import TripPointListView from "../view/tripPointsList.js";
import InnerTripPointList from "../view/innerPointsList.js";

const date = new Date();
const BLANK_POINT = {
  type: `Flight`,
  city: ``,
  price: ``,
  startDate: date,
  endDate: new Date().setHours(date.getHours() + 1),
  options: [],
  isFavorite: false,
  destination: {
    name: ` `,
    pictures: [],
    description: ` `
  }
};

export default class PointNew {
  constructor(pointListContainer, changeData, offers, destinations) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._pointEditComponent = null;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this.tripPointListView = new TripPointListView();
    this.innerTripPointList = new InnerTripPointList();
    this._offers = offers;
    this._destinations = destinations;
  }

  init(callback) {
    let newPoint = true;
    this._destroyCallback = callback;
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView(BLANK_POINT, this._offers, this._destinations, newPoint);
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
    this._enabaleNewPointBtn();
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

  _enabaleNewPointBtn() {
    document.querySelector(`#ADD_NEW_EVENT`).removeAttribute(`disabled`, ``);
  }

  _handleFormSubmit(point) {
    this._enabaleNewPointBtn();
    this._changeData(point, UserAction.ADD_POINT, UpdateType.MINOR);
  }

  _handleDeleteClick() {
    this._enabaleNewPointBtn();
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._enabaleNewPointBtn();
      this.destroy();
    }
  }

  setSaving() {
    this._enabaleNewPointBtn();
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
    this._pointEditComponent.setdisabledSelects();
  }
}
