
import TripSortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
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

    this._pointPresenter = {};
    this._groups = groups;
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  _initDataBind(point, points, originPoints) {
    this._point = point;
    this._points = points; // -сортированные точки
    this._originPoints = originPoints; // -ориг точки
  }

  renderPoint(pointsContainer, point, points, originPoints) {
    this._initDataBind(point, points, originPoints);

    const replacePointToEdit = () => {
      replace(pointEditComponent, pointComponent);
      pointEditComponent.setEditClickHandler(replaceEditToPoint);
      document.addEventListener(`keydown`, onEscKeyDown);
      pointEditComponent.setfavoriteClickHandler(this._handleFavoriteClick);
      this._pointPresenter[point.id2] = pointEditComponent; // !
    };

    const replaceEditToPoint = () => {
      replace(pointComponent, pointEditComponent);
      pointEditComponent.removeEditClickHandler(replaceEditToPoint);
      document.removeEventListener(`keydown`, onEscKeyDown);
      pointEditComponent.removeFavoriteClickHandler(this._handleFavoriteClick);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceEditToPoint();
        pointEditComponent.removeFavoriteClickHandler(this._handleFavoriteClick);
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

  _defaultSortedByDaysPoints(container, data, groups) {
    const originPoints = data.slice();
    this._clearPoints();
    render(container, this._containerView, RenderPosition.BEFOREEND);
    let dayNumber = 1;
    for (let group of groups.entries()) {
      const tripPointListElement = new TripPointListView(group, dayNumber);
      render(this._containerView, tripPointListElement, RenderPosition.BEFOREEND);
      const innerTripPointList = new InnerTripPointList();
      render(tripPointListElement, innerTripPointList, RenderPosition.BEFOREEND);
      dayNumber++;
      group[1].forEach((point) => {
        this.renderPoint(innerTripPointList, point, data, originPoints);
        this._pointPresenter[data.id] = this._containerView;
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
    render(tripPointListElement4Price, innerTripPointList4Price, RenderPosition.BEFOREEND);
    data.forEach((point) => {
      this.renderPoint(innerTripPointList4Price, point, data);
      this._pointPresenter[point.id] = this._containerView;
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
    render(tripPointListElement4Time, innerTripPointList4Time, RenderPosition.BEFOREEND);
    data.forEach((point) => {
      this.renderPoint(innerTripPointList4Time, point, data);
      this._pointPresenter[point.id] = this._containerView;
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
    console.log(updatedPoint);
    this._points = updateItem(this._points, updatedPoint);
    this._originPoints = updateItem(this._originPoints, updatedPoint);
    // new PointsPresenter().init(updatedPoint)
    // this._pointPresenter[updatedPoint.id2].init(updatedPoint);
  }

  _handleFavoriteClick() {
    console.log(this._point);
    // this._handlePointChange(Object.assign({}, this._point, { isFavorite: !this._point.isFavorite }));
  }
}
