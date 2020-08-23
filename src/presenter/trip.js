
import TripSortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import { render, RenderPosition, replace } from "../utils/render.js";
import { SORT_TYPES } from "../consts.js";

export default class PointsPresenter {
  constructor(siteSiteMainContainer, points) {
    this._sortView = new TripSortView();
    this._containerView = new TripsContainerView();
    this._siteSiteMainContainer = siteSiteMainContainer;
    this._currentSortType = SORT_TYPES.default;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._points = points;
  }

  init() {
    this._points = this._points.slice();
    this._defaultPoints = this._points.slice();
    this._sortingPoints();
    this._sortView.setSortTypeChangeHandler(this._handleSortTypeChange);
    this.defaultSortedByDaysPoints()
  }


  renderPoint(pointsContainer, point) {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point, this._points);
    const replacePointToEdit = () => {
      replace(pointEditComponent, pointComponent);
      pointComponent.removePointClickHandler();
      pointEditComponent.setEditClickHandler(replaceEditToPoint)
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    const replaceEditToPoint = () => {
      replace(pointComponent, pointEditComponent);
      pointEditComponent.removeEditClickHandler();
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    pointComponent.setPointClickHandler(replacePointToEdit);
    render(pointsContainer, pointComponent, RenderPosition.BEFOREEND);
  }

  defaultSortedByDaysPoints() {
    const groups = new Map();
    this._defaultPoints.forEach((point) => {
      const date = point.startDate.toISOString().split(`T`)[0];
      if (!groups.has(date)) {
        groups.set(date, [point]);
      } else {
        const items = groups.get(date);
        items.push(point);
      }
    });

    render(this._siteSiteMainContainer, this._containerView, RenderPosition.BEFOREEND);
    let dayNumber = 1;
    for (let group of groups.entries()) {
      const tripPointListElement = new TripPointListView(group, dayNumber).getElement();
      render(this._containerView, tripPointListElement, RenderPosition.BEFOREEND);
      dayNumber++;

      group[1].forEach(point => {
        const pointsContainer = tripPointListElement.querySelector(`.trip-events__list`);
        this.renderPoint(pointsContainer, point);
      });
    }
  }

  _sortingPoints() {
    switch (this._currentSortType) {
      case SORT_TYPES.price:
        this._points.sort((a, b) => b.price - a.price);
        let tripPointListElement4Price = new TripPointListView().getElement();
        render(this._containerView, tripPointListElement4Price, RenderPosition.BEFOREEND);
        this._points.forEach((point) => {
          this.renderPoint(tripPointListElement4Price.querySelector(`.trip-events__list`), point);
        });
        this._sortView.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
        break;
      case SORT_TYPES.time:
        this._points.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
        let tripPointListElement4Time = new TripPointListView().getElement();
        render(this._containerView, tripPointListElement4Time, RenderPosition.BEFOREEND);
        this._points.forEach((point) => {
          this.renderPoint(tripPointListElement4Time.querySelector(`.trip-events__list`), point);
        });
        this._sortView.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
        break;
      default:
        this._clearPoints();
        this.defaultSortedByDaysPoints();
        break;
    }
  }

  _clearPoints() {
    this._containerView.getElement().innerHTML = ``;
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearPoints();
    this._sortingPoints();
  }
}
