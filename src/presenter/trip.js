
import TripSortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import { render, RenderPosition, replace } from "../utils/render.js";
import { debounce } from "../utils/common.js";

export default class PointsPresenter {
  constructor(points, groups, tripEndDay, siteSiteMainContainer) {
    this._points = points;
    this._groups = groups;
    this._tripEndDay = tripEndDay;
    this._sortView = new TripSortView().getElement();
    this._containerView = new TripsContainerView().getElement();
    this._siteSiteMainContainer = siteSiteMainContainer;
  }


  init() {
    this.renderSortDays();
    this.renderPoints();
  }

  renderSortDays() {
    render(this._siteSiteMainContainer, this._sortView, RenderPosition.BEFOREEND);
    render(this._siteSiteMainContainer, this._containerView, RenderPosition.BEFOREEND);
  }

  renderPoints() {
    const tripDaysContainer = document.querySelector(`.trip-days`);

    const renderPoint = (pointsContainer, point) => {
      const pointComponent = new PointView(point);
      const pointEditComponent = new PointEditView(point, this._points);

      const replacePointToEdit = () => {
        replace(pointEditComponent, pointComponent);
        pointComponent.removePointClickHandler(debounce(replacePointToEdit));
        pointEditComponent.setEditClickHandler(debounce(replaceEditToForm))
        document.addEventListener(`keydown`, onEscKeyDown);
      };

      const replaceEditToForm = () => {
        replace(pointComponent, pointEditComponent);
        pointEditComponent.removeEditClickHandler(debounce(replaceEditToForm))
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

    // let sortPriceBtn = document.querySelector(`#sort-price`);
    // sortPriceBtn.addEventListener(`click`, function () {
    //   console.log('click')
    // })
    console.log(this._groups);
    let dayNumber = 1;
    for (let group of this._groups.entries()) {
      const tripPointListElement = new TripPointListView(group, dayNumber).getElement();
      render(tripDaysContainer, tripPointListElement, RenderPosition.BEFOREEND);
      dayNumber++;

      group[1].forEach(point => {
        //let numstest = numSort.sort((prev, next) => prev.price - next.price);
        const pointsContainer = tripPointListElement.querySelector(`.trip-events__list`);
        renderPoint(pointsContainer, point);
      });
    }
  }
}
