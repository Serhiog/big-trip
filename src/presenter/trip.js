
import TripSortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import { render, RenderPosition, replace } from "../utils/render.js";
import { debounce } from "../utils/common.js";

export default class PointsPresenter {
  constructor(points, groups, tripEndDay, siteSiteMainContainer, originalPoints) {
    this._points = points;
    this._groups = groups;
    this._tripEndDay = tripEndDay;
    this._sortView = new TripSortView().getElement();
    this._containerView = new TripsContainerView().getElement();
    this._siteSiteMainContainer = siteSiteMainContainer;
    this._originalPoints = originalPoints;
  }

  init() {
    this.renderSortDays();
    this.renderSortPrice();
    this.renderPoints();
  }

  renderSortDays() {
    render(this._siteSiteMainContainer, this._sortView, RenderPosition.BEFOREEND);
    render(this._siteSiteMainContainer, this._containerView, RenderPosition.BEFOREEND);
  }

  renderSortPrice() {

    let setSort = function () {
      let allPoints = document.querySelectorAll(`.trip-events__item`);
      let allDays = document.querySelectorAll(`.day__counter`);
      let allDates = document.querySelectorAll(`.day__date`);
      let tripSortLabel = document.querySelector(`.trip-sort__item--day`)
      const pointsContainer = document.querySelector(`.trip-events__list`);

      allPoints.forEach(point => {
        point.remove()
      });

      allDays.forEach(day => {
        day.remove()
      });

      allDates.forEach(date => {
        date.remove()
      });

      tripSortLabel.textContent = ``;

      sortedPoints.forEach(element => {
        render(pointsContainer, new PointView(element).getElement(), RenderPosition.AFTERBEGIN);
      });
    };

    let sortedPoints = this._points.sort((prev, next) => prev.price - next.price);
    document.querySelector(`#sort-price`).addEventListener(`click`, setSort)

  }


  renderPoints() {

    const tripDaysContainer = document.querySelector(`.trip-days`);

    const renderPoint = (pointsContainer, point) => {
      const pointComponent = new PointView(point);
      const pointEditComponent = new PointEditView(point, this._points);

      const replacePointToEdit = () => {
        replace(pointEditComponent, pointComponent);
        pointComponent.removePointClickHandler();
        pointEditComponent.setEditClickHandler(debounce(replaceEditToForm))
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

      pointComponent.setPointClickHandler(debounce(replacePointToEdit));

      render(pointsContainer, pointComponent.getElement(), RenderPosition.BEFOREEND);
    };

    let dayNumber = 1;

    for (let group of this._groups.entries()) {
      const tripPointListElement = new TripPointListView(group, dayNumber).getElement();
      render(tripDaysContainer, tripPointListElement, RenderPosition.BEFOREEND);
      dayNumber++;

      group[1].forEach(point => {
        const pointsContainer = tripPointListElement.querySelector(`.trip-events__list`);
        renderPoint(pointsContainer, point);
      });
    }

  }
}
