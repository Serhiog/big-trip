
import SortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import GroupPresenter from './group.js';
import { render, RenderPosition, remove } from "../utils/render.js";
import { SortType, UpdateType, UserAction } from "../consts.js";
// import { updateItem } from "../utils/common.js";
import NoPoints from "../view/no-Points.js";

export default class TripPresenter {
  constructor(siteMainContainer, pointsModel) {
    this._siteMainContainer = siteMainContainer;
    // this._sortView = new TripSortView();
    this._containerView = new TripsContainerView();
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    // this._points = points;
    this._groupPresenter = {};
    // this._sitePointsListContainer = sitePointsListContainer;
    // this._handlePointChange = this._handlePointChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel = pointsModel;
    this._pointsModel.addObserver(this._handleModelEvent);
    this._sortComponent = null;

  }

  init() {
    // this._points = this._points.slice();
    // this._defaultPoints = this._points.slice();
    // if (!this._points.length) {
    // render(this._siteMainContainer, new NoPoints(), RenderPosition.AFTEREND);
    // return;
    // }

    // render(this._siteMainContainer, this._sortView, RenderPosition.BEFOREEND);
    // this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._siteMainContainer, this._containerView, RenderPosition.BEFOREEND);
    this._renderGroups();
  }


  _getPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort((a, b) => b.price - a.price);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
    }
    return this._pointsModel.getPoints();
  }

  _renderNoPoints() {
    render(this._siteMainContainer, new NoPoints(), RenderPosition.AFTEREND);
  }

  _renderGroups() {
    const groups = this._groupPoints();
    let dayNumber = 1;
    for (let [key, points] of groups.entries()) {
      this._renderGroup(points, dayNumber);
      dayNumber++;
    }
    this._renderSort();
  }


  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    render(this._siteMainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderGroup(points, dayNumber) {
    const showDate = this._currentSortType === SortType.DEFAULT;
    this._groupPresenter[dayNumber] = new GroupPresenter(this._containerView, this._handleViewAction, this._handleModeChange);
    this._groupPresenter[dayNumber].init(points, dayNumber, showDate);
  }

  _groupPoints() {
    const groups = new Map();
    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
    }

    if (this._currentSortType === SortType.DEFAULT) {
      points.forEach((stop) => {
        const date = stop.startDate.toISOString().split(`T`)[0];
        if (!groups.has(date)) {
          groups.set(date, [stop]);
        } else {
          const items = groups.get(date);
          items.push(stop);
        }
      });
    } else {
      points.forEach((point, index) => {
        groups.set(index, [point]);
      });
    }
    return groups;
  }

  // _handlePointChange(updatedPoint, dayNumber) {

  //   // this._pointsList = updateItem(this._points, updatedPoint);
  //   // this._defaultPoints = updateItem(this._defaultPoints, updatedPoint);
  //   this._groupPresenter[dayNumber].getPointPresenter(updatedPoint);
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._taskPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderGroups();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({ resetRenderedTripCount: true, resetSortType: true });
        this._renderGroups();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._groupPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // _sortingPoints() {
  //   switch (this._currentSortType) {
  //     case SortType.PRICE:
  //       this._points.price.sort((a, b) => b.price - a.price);
  //       break;
  //     case SortType.TIME:
  //       this._points.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
  //       break;
  //   }
  // }

  // _clearPoints() {
  //   Object
  //     .values(this._groupPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   this._groupPresenter = {};
  // }

  _clearTrip({ resetRenderedPointkCount = false, resetSortType = false } = {}) {
    const pointCount = this._getPoints().length;

    Object
      .values(this._groupPresenter)
      .forEach((presenter) => presenter.destroy());
    this._groupPresenter = {};

    remove(this._sortComponent);
    // remove(this._noPointComponent);

    if (resetRenderedPointkCount) {
      this._renderedPointCount = 10; // ! Задать константу
    } else {
      this._renderedPointCount = Math.min(pointCount, this._renderedPointCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleSortTypeChange(sortType) {
    // if (this._currentSortType === sortType) {
    //   return;
    // }

    this._currentSortType = sortType;
    // this._clearPoints();
    // this._sortingPoints();
    // this._renderGroups();
    this._clearTrip({ resetRenderedPointkCount: true });
    this._renderGroups();
  }

}
