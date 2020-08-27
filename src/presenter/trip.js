
import TripSortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import InnerTripPointList from "../view/innerPointsList.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import { SortType } from "../consts.js";
import NoPoints from "../view/no-Points.js";

export default class PointsPresenter {
  constructor(siteMainContainer, points, sitePointsListContainer) {
    this._siteMainContainer = siteMainContainer;
    this._sortView = new TripSortView();
    this._containerView = new TripsContainerView();
    this._tripPointListView = new TripPointListView();
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._points = points;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._pointPresenter = {};
    this._sitePointsListContainer = sitePointsListContainer;
  }

  init() {
    this.checkPoints();
    this._points = this._points.slice();
    this._defaultPoints = this._points.slice();
    this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);
    this.defaultSortedByDaysPoints();
  }

  checkPoints() {
    render(this._siteMainContainer, new NoPoints(this._points), RenderPosition.AFTEREND);
  }


  renderPoint(pointsContainer, point) {

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point, this._points);
    const replacePointToEdit = () => {
      replace(pointEditComponent, pointComponent);
      pointEditComponent.setEditClickHandler(replaceEditToPoint)
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const replaceEditToPoint = () => {
      replace(pointComponent, pointEditComponent);
      pointEditComponent.removeEditClickHandler();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToPoint();
      }
    };
    pointComponent.setPointClickHandler(replacePointToEdit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(pointsContainer, pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (pointsContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(pointComponent, prevPointComponent);
    }
    if (pointsContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  defaultSortedByDaysPoints() {
    const groups = new Map();
    this._defaultPoints.forEach((stop) => {
      const date = stop.startDate.toISOString().split(`T`)[0];
      if (!groups.has(date)) {
        groups.set(date, [stop]);
      } else {
        const items = groups.get(date);
        items.push(stop);
      }
    });

    render(this._siteMainContainer, this._containerView, RenderPosition.BEFOREEND);
    let dayNumber = 1;
    for (let group of groups.entries()) {
      const tripPointListElement = new TripPointListView(group, dayNumber);
      render(this._containerView, tripPointListElement, RenderPosition.BEFOREEND);
      const innerTripPointList = new InnerTripPointList();
      render(tripPointListElement, innerTripPointList, RenderPosition.BEFOREEND);
      dayNumber++;
      group[1].forEach(point => {
        this.renderPoint(innerTripPointList, point);
        this._pointPresenter[point.id] = this._containerView; //!
      });
    }
  }

  _sortingPoints() {
    switch (this._currentSortType) {
      case SortType.PRICE:
        this._points.sort((a, b) => b.price - a.price);
        render(this._siteMainContainer, this._containerView, RenderPosition.BEFOREEND);
        let tripPointListElement4Price = new TripPointListView();
        render(this._containerView, tripPointListElement4Price, RenderPosition.BEFOREEND);
        const innerTripPointList4Price = new InnerTripPointList();
        render(tripPointListElement4Price, innerTripPointList4Price, RenderPosition.BEFOREEND)
        this._points.forEach((point) => {
          this.renderPoint(innerTripPointList4Price, point);
          this._pointPresenter[point.id] = this._containerView; //!
        });
        this._sortView.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
        break;
      case SortType.TIME:
        this._points.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
        render(this._siteMainContainer, this._containerView, RenderPosition.BEFOREEND);
        let tripPointListElement4Time = new TripPointListView();
        render(this._containerView, tripPointListElement4Time, RenderPosition.BEFOREEND);
        const innerTripPointList4Time = new InnerTripPointList();
        render(tripPointListElement4Time, innerTripPointList4Time, RenderPosition.BEFOREEND)
        this._points.forEach((point) => {
          this.renderPoint(innerTripPointList4Time, point);
          this._pointPresenter[point.id] = this._containerView; //!
        });
        this._sortView.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
        break;
      case SortType.DEFAULT:
        this._clearPoints();
        this.defaultSortedByDaysPoints();
        break;
    }
  }

  destroy(presenter) {
    remove(presenter);
  }

  _clearPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => this.destroy(presenter));
    this._pointPresenter = {};
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearPoints();
    this._sortingPoints();
  }
}
