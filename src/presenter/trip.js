
import SortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import GroupPresenter from './group.js';
import { render, RenderPosition, remove } from "../utils/render.js";
import { SortType, UpdateType, UserAction, FilterType } from "../consts.js";
import NoPoints from "../view/no-Points.js";
import { filter } from "../utils/filter.js";
import PointNewPresenter from "./point-new.js";

export default class TripPresenter {
  constructor(siteMainContainer, pointsModel, filterModel) {
    this._siteMainContainer = siteMainContainer;
    this._containerView = new TripsContainerView();
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._groupPresenter = {};
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel = pointsModel;
    // this._pointsModel.addObserver(this._handleModelEvent);
    this._sortComponent = null;
    this._filterModel = filterModel;
    // this._filterModel.addObserver(this._handleModelEvent);
    this._pointNewPresenter = new PointNewPresenter(this._containerView, this._handleViewAction);
    this._filter = filter;
  }

  init() {
    render(this._siteMainContainer, this._containerView, RenderPosition.BEFOREEND);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderGroups();
  }

  destroy() {
    this._clearTrip({ resetSortType: true });
    remove(this._containerView);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }


  createPoint(callback) {
    // this._currentSortType = SortType.DEFAULT;
    // this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(this._pointsModel, callback);
  }

  _renderNoPoints() {
    render(this._siteMainContainer, new NoPoints(), RenderPosition.BEFOREEND);
  }


  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = this._filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.PRICE:
        return filtredPoints.sort((a, b) => b.price - a.price);
      case SortType.TIME:
        return filtredPoints.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
      case SortType.DEFAULT:
        return filtredPoints.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    }
  }

  _renderGroups() {
    const groups = this._groupPoints();
    let dayNumber = 1;
    for (let [key, points] of groups.entries()) {
      this._renderGroup(points, dayNumber);
      dayNumber++;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    if (!this._getPoints().length) {
      this._renderNoPoints();
    } else {
      this._sortComponent = new SortView(this._currentSortType);
      render(this._siteMainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderGroup(points, dayNumber) {
    const showDate = this._currentSortType === SortType.DEFAULT;
    this._groupPresenter[dayNumber] = new GroupPresenter(this._containerView, this._handleViewAction, this._handleModeChange, points);
    this._groupPresenter[dayNumber].init(points, dayNumber, showDate);
  }

  _groupPoints() {
    this._renderSort();
    const groups = new Map();
    const points = this._getPoints();

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

  _handleViewAction(update, actionType, updateType) {
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
        this._groupPresenter[data.id].init(data);
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
    this._pointNewPresenter.destroy();
    Object
      .values(this._groupPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearTrip() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._groupPresenter)
      .forEach((presenter) => presenter.destroy());
    this._groupPresenter = {};

    remove(this._sortComponent);
    // remove(this._noPointComponent);
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearTrip({ resetRenderedPointkCount: true });
    this._renderGroups();
  }

}
