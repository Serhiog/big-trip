import MajorTripRouteView from "../view/majorTripInfo.js";
import MajorTripCostView from "../view/majorTripCost.js";
import TripListToggleView from "../view/toggleViewListTrip.js";
import TripFilterView from "../view/mainTripFilter.js";
import { render, RenderPosition } from "../utils/render.js";

export default class HeaderPresenter {
  constructor(points, siteHeaderMainTripContainer, siteHeaderFilterTrip) {
    this._points = points;
    this._siteHeaderMainTripContainer = siteHeaderMainTripContainer;
    this._siteHeaderFilterTrip = siteHeaderFilterTrip;
  }

  init() {
    render(this._siteHeaderMainTripContainer, new MajorTripRouteView(this._points), RenderPosition.AFTERBEGIN);
    const siteMajorInfoTrip = this._siteHeaderMainTripContainer.querySelector(`.trip-main__trip-info`);
    render(siteMajorInfoTrip, new MajorTripCostView(this._points), RenderPosition.BEFOREEND);
    render(this._siteHeaderFilterTrip, new TripListToggleView(), RenderPosition.AFTEREND);
    render(this._siteHeaderFilterTrip, new TripFilterView(), RenderPosition.BEFOREEND);
  }

}
