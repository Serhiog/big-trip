
import TripSortView from "../view/tripSort.js";
<<<<<<< HEAD

import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import { render, RenderPosition, replace } from "../utils/render.js";
import { SORT_TYPES } from "../consts.js";

export default class PointsPresenter {
  constructor(siteSiteMainContainer, points) {
    this._sortView = new TripSortView();

    this._siteSiteMainContainer = siteSiteMainContainer;
    this._currentSortType = SORT_TYPES.default;
=======
import TripsContainerView from "../view/tripsContainer.js";
import GroupPresenter from './group.js';
import { render, RenderPosition } from "../utils/render.js";
import { SortType } from "../consts.js";
import { updateItem } from "../utils/common.js";
import NoPoints from "../view/no-Points.js";

export default class TripPresenter {
  constructor(siteMainContainer, points, sitePointsListContainer) {
    this._siteMainContainer = siteMainContainer;
    this._sortView = new TripSortView();
    this._containerView = new TripsContainerView();
    this._currentSortType = SortType.DEFAULT;
>>>>>>> module6-task1-2
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._points = points;
    this._groupPresenter = {};
    this._sitePointsListContainer = sitePointsListContainer;
    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init() {
    this._points = this._points.slice();
    this._defaultPoints = this._points.slice();

    if (!this._points.length) {
      render(this._siteMainContainer, new NoPoints(), RenderPosition.AFTEREND);
      return;
    }

    render(this._siteMainContainer, this._sortView, RenderPosition.BEFOREEND);
    this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._siteMainContainer, this._containerView, RenderPosition.BEFOREEND);
    this._renderGroups();
  }

  _renderGroups() {
    const groups = this._groupPoints();
    let dayNumber = 1;
    for (let [key, points] of groups.entries()) {
      this._renderGroup(points, dayNumber);
      dayNumber++;
    }
  }

  _renderGroup(points, dayNumber) {
    const showDate = this._currentSortType === SortType.DEFAULT;
    this._groupPresenter[dayNumber] = new GroupPresenter(this._containerView, this._handlePointChange, this._handleModeChange);
    this._groupPresenter[dayNumber].init(points, dayNumber, showDate);
  }

  _groupPoints() {
    const groups = new Map();

    if (this._currentSortType === SortType.DEFAULT) {
      this._defaultPoints.forEach((stop) => {
        const date = stop.startDate.toISOString().split(`T`)[0];
        if (!groups.has(date)) {
          groups.set(date, [stop]);
        } else {
          const items = groups.get(date);
          items.push(stop);
        }
      });
    } else {
      this._points.forEach((point, index) => {
        groups.set(index, [point]);
      });
    }
    return groups;
  }

  _handlePointChange(updatedPoint) {
    this._pointsList = updateItem(this._points, updatedPoint);
    this._defaultPoints = updateItem(this._defaultPoints, updatedPoint);
    this._groupPresenter[updatedPoint.id + 1].getPointPresenter(updatedPoint);
  }

  _handleModeChange() {
    Object
      .values(this._groupPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortingPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        this._points.sort((a, b) => b.price - a.price);
        break;
      case SortType.TIME:
        this._points.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
        break;
    }
  }

  _clearPoints() {
    Object
      .values(this._groupPresenter)
      .forEach((presenter) => presenter.destroy());
    this._groupPresenter = {};
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPoints();
    this._sortingPoints();
    this._renderGroups();
  }
}
