import MajorTripRouteView from "../view/majorTripInfo.js";
import MajorTripCostView from "../view/majorTripCost.js";
// import TripListToggleView from "../view/toggleViewListTrip.js";
import TripFilterView from "../view/mainTripFilter.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import { FilterType, UpdateType} from "../consts.js";
import { filter } from "../utils/filter.js";

export default class HeaderPresenter {
  constructor(points, siteHeaderMainTripContainer, siteHeaderFilterTrip, filterModel, pointsModel) {
    this._points = points;
    this._siteHeaderMainTripContainer = siteHeaderMainTripContainer;
    this._siteHeaderFilterTrip = siteHeaderFilterTrip;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._currentFilter = null;
    this._filterComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._siteHeaderMainTripContainer, new MajorTripRouteView(this._points), RenderPosition.AFTERBEGIN);
    const siteMajorInfoTrip = this._siteHeaderMainTripContainer.querySelector(`.trip-main__trip-info`);
    render(siteMajorInfoTrip, new MajorTripCostView(this._points), RenderPosition.BEFOREEND);
    // render(this._siteHeaderFilterTrip, new TripListToggleView(), RenderPosition.AFTEREND);
    this.initStartFilter()
  }

  initStartFilter() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new TripFilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._siteHeaderMainTripContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.initStartFilter();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const points = this._pointsModel.getPoints();

    return [
      {
        type: FilterType.EVERYTHING,
        name: `everything`,
        count: filter[FilterType.EVERYTHING](points).length
      },
      {
        type: FilterType.FUTURE,
        name: `future`,
        count: filter[FilterType.FUTURE](points).length
      },
      {
        type: FilterType.PAST,
        name: `past`,
        count: filter[FilterType.PAST](points).length
      }
    ];
  }

}
