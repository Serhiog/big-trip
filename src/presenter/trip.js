import MajorTripRouteView from "../view/majorTripInfo.js";
import MajorTripCostView from "../view/majorTripCost.js";
import TripListToggleView from "../view/toggleViewListTrip.js";
import TripFilterView from "../view/mainTripFilter.js";
import TripSortView from "../view/tripSort.js";
import TripsContainerView from "../view/tripsContainer.js";
import PointView from "../view/tripPoint.js";
import PointEditView from "../view/pointEditor.js";
import TripPointListView from "../view/tripPointsList.js";
import { render, RenderPosition } from "../utils/render.js";
import { debounce } from "../utils/common.js";

export default class PointsPresenter {
  constructor(points, groups, tripEndDay) {
    this._points = points;
    this._groups = groups;
    this._tripEndDay = tripEndDay;
  }


  _renderHeader() {
    const sitePageBodyContent = document.querySelector(`.page-body`);
    const siteHeaderContainer = sitePageBodyContent.querySelector(`.page-header`);
    const siteHeaderMainTripContainer = siteHeaderContainer.querySelector(`.trip-main`);

    render(siteHeaderMainTripContainer, new MajorTripRouteView(this._points, this._tripEndDay).getElement(), RenderPosition.AFTERBEGIN);

    const siteMajorInfoTrip = document.querySelector(`.trip-main__trip-info`);

    render(siteMajorInfoTrip, new MajorTripCostView(this._points).getElement(), RenderPosition.BEFOREEND);

    const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);
    const siteHeaderFilterToggleView = siteHeaderFilterTrip.querySelector(`.trip-main__trip-controls h2`);


    render(siteHeaderFilterToggleView, new TripListToggleView().getElement(), RenderPosition.AFTEREND);

    render(siteHeaderFilterTrip, new TripFilterView().getElement(), RenderPosition.BEFOREEND);
  }

  _renderSortDays() {
    const siteSiteMainContainer = document.querySelector(`.page-body__page-main`);
    const siteTripConstructor = siteSiteMainContainer.querySelector(`.trip-events h2`);

    render(siteTripConstructor, new TripSortView().getElement(), RenderPosition.AFTEREND);
    const siteTripSortTemplate = siteSiteMainContainer.querySelector(`.trip-events__trip-sort`);

    render(siteTripSortTemplate, new TripsContainerView().getElement(), RenderPosition.AFTEREND);
  }

  _renderPoints() {
    const tripDaysContainer = document.querySelector(`.trip-days`);
    const renderPoint = (pointsContainer, point) => {
      const pointComponent = new PointView(point);
      const pointEditComponent = new PointEditView(point, this._points);

      const replacePointToEdit = () => {
        pointsContainer.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
        pointComponent.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, replacePointToEdit);
        pointEditComponent.setEditClickHandler(debounce(replaceEditToForm))
        document.addEventListener(`keydown`, onEscKeyDown);
      };

      const replaceEditToForm = () => {
        pointsContainer.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
        pointEditComponent.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, replaceEditToForm);
      };

      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          replaceEditToForm();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      pointComponent.setEditClickHandler(debounce(replacePointToEdit));

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
