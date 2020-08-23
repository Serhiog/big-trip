
import TripSortView from "../view/tripSort.js";

import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import { render, RenderPosition, replace } from "../utils/render.js";
import { SORT_TYPES } from "../consts.js";

export default class PointsPresenter {
  constructor(siteSiteMainContainer) {
    this._sortView = new TripSortView();

    this._siteSiteMainContainer = siteSiteMainContainer;
    this._currentSortType = 'sort-event';

  }

  init(points) {
    this._points = points.slice();
    this._defaultPoints = points.slice();
    //this._renderPoints();
  }


  _renderPoints() {

    const renderPoint = (pointsContainer, point) => {
      const pointComponent = new PointView(point);
      const pointEditComponent = new PointEditView(point, this._points);

      const replacePointToEdit = () => {
        replace(pointEditComponent, pointComponent);
        pointComponent.removePointClickHandler();
        pointEditComponent.setEditClickHandler(replaceEditToForm)
        document.addEventListener(`keydown`, onEscKeyDown);
      };

      const replaceEditToForm = () => {
        replace(pointComponent, pointEditComponent);
        pointEditComponent.removeEditClickHandler()
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          replaceEditToForm();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      pointComponent.setPointClickHandler(replacePointToEdit);

      render(pointsContainer, pointComponent, RenderPosition.BEFOREEND);
    };

    if (this._currentSortType === 'sort-event') {
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
      const tripDaysContainer = document.querySelector(`.trip-days`);
      let dayNumber = 1;

      for (let group of groups.entries()) {
        const tripPointListElement = new TripPointListView(group, dayNumber);
        render(tripDaysContainer, tripPointListElement, RenderPosition.BEFOREEND);
        dayNumber++;

        group[1].forEach(point => {
          const pointsContainer = tripPointListElement.querySelector(`.trip-events__list`);
          renderPoint(pointsContainer, point);
        });
      }
    }

    if (this._currentSortType === 'sort-time') {
      this._points.sort((a, b) => (b.endDate.getTime() - b.startDate.getTime()) - (a.endDate.getTime() - a.startDate.getTime()));
      const tripPointListElement = new TripPointListView(``, ``).getElement();
      render(this._containerView, tripPointListElement, RenderPosition.BEFOREEND);
      const pointsContainer = tripPointListElement.querySelector(`.trip-events__list`);
      this._points.forEach((point) => {
        renderPoint(pointsContainer, point);
      });
      document.querySelector(`.trip-sort__item--day`).innerHTML = ``;
    }

    if (this._currentSortType === 'sort-price') {
      this._points.sort((a, b) => b.price - a.price);
      const tripPointListElement = new TripPointListView(``, ``).getElement();
      render(this._containerView, tripPointListElement, RenderPosition.BEFOREEND);
      const pointsContainer = tripPointListElement.querySelector(`.trip-events__list`);
      this._points.forEach((point) => {
        renderPoint(pointsContainer, point);
      });
      document.querySelector(`.trip-sort__item--day`).innerHTML = ``;
    }
  }

}
