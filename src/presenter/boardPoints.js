import { render, RenderPosition } from "../utils/render.js";
import TripSortView from "../view/tripSort.js";
import PointsPresenter from "../presenter/trip.js";
import TripsContainerView from "../view/tripsContainer.js";

export default class BoardPointsPresenter {
  constructor(siteSiteMainContainer, points) {
    this._siteSiteMainContainer = siteSiteMainContainer;
    this._sortView = new TripSortView();
    this._points = points;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._containerView = new TripsContainerView();
  }

  _checkPoints() {
    switch (!this._points.length) {
      case true:
        this._sortView = ``;
        break;
      default:
        render(this._siteSiteMainContainer, this._sortView, RenderPosition.BEFOREEND);
        this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearPoints();
    //this._renderPoints();
  }

  _clearPoints() {
    this._containerView.getElement().innerHTML = ``;
  }

  init() {
    this._checkPoints();
  }
}
