import { render, RenderPosition } from "../utils/render.js";
import { updateItem } from "../utils/common.js";
import { SortType } from "../consts.js";
import TripPointListView from "../view/tripPointsList.js";
import InnerTripPointList from "../view/innerPointsList.js";
import TripsContainerView from "../view/tripsContainer.js";
import TripSortView from "../view/tripSort.js";
import PointPresenter from "../presenter/pointNEW.js";

const POINT_COUNT_PER_STEP = 8;

export default class PointsList {
  constructor(siteMainContainer, groups) {
    this._groups = groups;
    this._siteMainContainer = siteMainContainer;
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._containerView = new TripsContainerView();
    this._sortComponent = new TripSortView();
  }

  init(pointsList) {
    this._pointsList = pointsList.slice();
    this._sourcedPointsList = pointsList.slice();

    for (let group of this._groups.entries()) {
      let dayNumber = 1;
      const tripPointListElement = new TripPointListView(group, dayNumber);
      render(this._siteMainContainer, this._containerView, RenderPosition.BEFOREEND);
      render(this._containerView, tripPointListElement, RenderPosition.BEFOREEND);
      const innerTripPointList = new InnerTripPointList();
      render(tripPointListElement, innerTripPointList, RenderPosition.BEFOREEND);
      dayNumber++;
    }
    this._renderBoard();
  }

  _handlePointChange(updatedPoints) {
    this._pointsList = updateItem(this._pointsList, updatedPoints);
    this._sourcedPointsList = updateItem(this._sourcedPointsList, updatedPoints);
    this._pointPresenter[updatedPoints.id].init(updatedPoints);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._pointsList.sort((a, b) => b.price - a.price);
        break;
      case SortType.TIME:
        this._pointsList.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
        break;
      default:
        this._pointsList = this._sourcedPointsList.slice();
    }

    //this._currentSortType = sortType; // Добавить проверку на отс-ие точек
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
  }

  _renderSort() {
    render(this._siteMainContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const innerTripPointList = document.querySelector(`.trip-events__list`);
    const pointPresenter = new PointPresenter(innerTripPointList, this._handlePointChange);
    pointPresenter.init(point, this._pointsList);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(from, to) {
    this._pointsList
      .slice(from, to)
      .forEach((point) => this._renderPoint(point));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent, RenderPosition.AFTERBEGIN);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._renderedTaskCount = POINT_COUNT_PER_STEP;
  }

  _renderBoard() {
    // if (this._pointsList.every((task) => task.isArchive)) {
    //   this._renderNoTasks();
    //   return;
    // }  // Проверка на пустой массив

    this._renderSort();
    this._renderPoints();
  }
}
