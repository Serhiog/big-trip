import { render, RenderPosition } from "../utils/render.js";
import TripSortView from "../view/tripSort.js";

export default class BoardPointsPresenter {
  constructor(siteSiteMainContainer, points) {
    this._siteSiteMainContainer = siteSiteMainContainer;
    this._sortView = new TripSortView();
    this._points = points;
  }

  _checkPoints() {
    switch (this._points.length === 0) {
      case true:
        this._sortView = ``;
        break;
      default:
        render(this._siteSiteMainContainer, this._sortView, RenderPosition.BEFOREEND);
    }
  }

  init() {
    this._checkPoints();
  }
}
