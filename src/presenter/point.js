import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class PointPresenter {
  constructor(container, changeMode, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._replacePointToEdit = this._replacePointToEdit.bind(this);
    this._replaceEditToPoint = this._replaceEditToPoint.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._toSelectTypes = this._toSelectTypes.bind(this);
  }

  init(point) {
    this._point = point;
    this._renderPoint(this._container, this._point);
  }

  _renderPoint(pointsContainer, point) {
    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;
    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointEditComponent.setfavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setEditClickHandler(this._replaceEditToPoint);
    this._pointEditComponent.setTypesHandler(this._toSelectTypes);
    this._pointComponent.setPointClickHandler(this._replacePointToEdit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(pointsContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  _replacePointToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DEFAULT;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._point, { isFavorite: !this._point.isFavorite }));
  }

  _toSelectTypes(evt) {
    this._changeData(Object.assign({}, this._point, { type: evt.target.previousElementSibling.value }));

    switch (evt.target.previousElementSibling.value) {
      case `taxi`:
      case `bus`:
      case `train`:
        this._changeData(Object.assign({}, this._point, {
          options: [{
            title: `Switch to comfort`,
            price: 100
          }, {
            title: `Choose seats`,
            price: 5
          }]
        }));
        break;
      case `ship`:
      case `transport`:
      case `drive`:
        this._changeData(Object.assign({}, this._point, {
          options: [{
            title: `Travel by train`,
            price: 40
          }, {
            title: `Add meal`,
            price: 15
          }, {
            title: `Add luggage`,
            price: 30
          }]
        }));
        break;
      case `flight`:
      case `check-in`:
      case `sightseeing`:
      case `restaurant`:
        this._changeData(Object.assign({}, this._point, {
          options: [{ title: `Add meal`, price: 15 }]
        }));
        break;
      default:
        break;
    }
  }
}
