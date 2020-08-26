import { render, RenderPosition } from "../utils/render.js";
import TripSortView from "../view/tripSort.js";
import { SortType } from "../consts.js";
import PointsPresenter from "./tripOLD.js";

export default class BoardPointsPresenter {
  constructor(siteMainContainer, points, groups) {
    this._siteMainContainer = siteMainContainer;
    this._sortView = new TripSortView();
    this._points = points;
    this._currentSortType = SortType.DEFAULT;
    this._trip = new PointsPresenter();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this.groups = groups;
  }

  _checkPoints() {
    switch (this._points.length === 0) {
      case true:
        this._sortView = ``;
        break;
      default:
        render(this._siteMainContainer, this._sortView, RenderPosition.AFTERBEGIN);
    }
  }

  init() {
    this._checkPoints();
    this._points = this._points.slice();
    new PointsPresenter(this._siteMainContainer).init(this.groups);
    this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._sortingPoints();
  }

  _sortingPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        this._trip._sortPrice(this._points, this._siteMainContainer);
        break;
      case SortType.TIME:
        this._trip._sortTime(this._points, this._siteMainContainer);
        break;
      case SortType.DEFAULT:
        this._trip._defaultSortedByDaysPoints(this.groups, this._siteMainContainer);
        break;
    }
  }
}
