
import TripSortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import InnerTripPointList from "../view/innerPointsList.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import { SortType } from "../consts.js";
import { updateItem } from "../utils/common.js";

export default class PointsPresenter {
  constructor(siteMainContainer, points, groups) {
    this._siteMainContainer = siteMainContainer;
    this._sortView = new TripSortView();
    this._containerView = new TripsContainerView();
    this._tripPointListView = new TripPointListView();
    this._currentSortType = SortType.DEFAULT;
    this._points = points;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._pointPresenter = {};
    this._groups = groups;
    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init() {
    this._defaultSortedByDaysPoints(this._groups, this._points, this._siteMainContainer);
    this._points = this._points.slice();
    this._originPoints = this._points.slice();
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
      pointEditComponent.setFavoriteClickHandler(this._handlePointChange);
    };

    const replaceEditToPoint = () => {
      replace(pointComponent, pointEditComponent);
      pointEditComponent.removeEditClickHandler();
      document.removeEventListener(`keydown`, onEscKeyDown);
      pointEditComponent.removeFavoriteClickHandler();
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

  _defaultSortedByDaysPoints(groups, point, container) {
    this._clearPoints();
    render(container, this._containerView, RenderPosition.BEFOREEND);
    let dayNumber = 1;
    for (let group of groups.entries()) {
      const tripPointListElement = new TripPointListView(group, dayNumber);
      render(this._containerView, tripPointListElement, RenderPosition.BEFOREEND);
      const innerTripPointList = new InnerTripPointList();
      render(tripPointListElement, innerTripPointList, RenderPosition.BEFOREEND);
      dayNumber++;
      group[1].forEach(place => {
        this.renderPoint(innerTripPointList, place);
        this._pointPresenter[point.id] = this._containerView; //!
      });
    }
  }

  _sortPrice(data, container) {
    this._clearPoints();
    data.sort((a, b) => b.price - a.price);
    render(container, this._containerView, RenderPosition.BEFOREEND);
    let tripPointListElement4Price = new TripPointListView();
    render(this._containerView, tripPointListElement4Price, RenderPosition.BEFOREEND);
    const innerTripPointList4Price = new InnerTripPointList();
    render(tripPointListElement4Price, innerTripPointList4Price, RenderPosition.BEFOREEND)
    data.forEach((point) => {
      this.renderPoint(innerTripPointList4Price, point);
      this._pointPresenter[point.id] = this._containerView; //!
    });
    this._sortView.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
  }

  _sortTime(data, container) {
    this._clearPoints();
    data.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
    render(container, this._containerView, RenderPosition.BEFOREEND);
    let tripPointListElement4Time = new TripPointListView();
    render(this._containerView, tripPointListElement4Time, RenderPosition.BEFOREEND);
    const innerTripPointList4Time = new InnerTripPointList();
    render(tripPointListElement4Time, innerTripPointList4Time, RenderPosition.BEFOREEND)
    data.forEach((point) => {
      this.renderPoint(innerTripPointList4Time, point);
      this._pointPresenter[point.id] = this._containerView; //!
    });
    this._sortView.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
  }

  _clearPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => this.destroy(presenter));
    this._pointPresenter = {};
  }


  destroy(presenter) {
    remove(presenter);
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._boardTasks, updatedPoint);
    this._originPoints = updateItem(this._sourcedBoardTasks, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }
}