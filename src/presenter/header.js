import MajorTripRouteView from "../view/majorTripInfo.js";
import MajorTripCostView from "../view/majorTripCost.js";
import TripListToggleView from "../view/toggleViewListTrip.js";
import TripFilterView from "../view/mainTripFilter.js";
import NewEventBtnTemplate from "../view/newEventBtn.js";
import StatisticsView from '../view/statistics';
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import { FilterType, UpdateType, MenuItem } from "../consts.js";
import { filter } from "../utils/filter.js";

export default class HeaderPresenter {
  constructor(siteHeaderMainTripContainer, siteHeaderFilterTrip, siteMainContainer, filterModel, pointsModel, tripPresenter) {
    this._siteHeaderMainTripContainer = siteHeaderMainTripContainer;
    this._siteHeaderFilterTrip = siteHeaderFilterTrip;
    this._siteMainContainer = siteMainContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;
    this._currentFilter = null;
    this._filterComponent = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this)
    this._tripPresenter = tripPresenter;
    this._prevMajorTripRouteViewComponent = null;
    this._prevMajorTripCostViewComponent = null;
    this._prevSiteMenuComponent = null;
    this._prevNewEventBtnComponent = null;
    this._statisticsComponent = null;
  }

  init() {
    const majorTripRouteView = this._prevMajorTripRouteViewComponent;
    this._prevMajorTripRouteViewComponent = new MajorTripRouteView(this._pointsModel.getPoints());
    // const majorTripCostView = this._prevMajorTripCostViewComponent;
    // this._prevMajorTripCostViewComponent = new MajorTripCostView(this._pointsModel.getPoints());

    if (majorTripRouteView === null) {
      render(this._siteHeaderMainTripContainer, this._prevMajorTripRouteViewComponent, RenderPosition.AFTERBEGIN);
      //const siteMajorInfoTrip = this._siteHeaderMainTripContainer.querySelector(`.trip-main__trip-info`);
      // render(this._prevMajorTripRouteViewComponent, this._prevMajorTripCostViewComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._prevMajorTripRouteViewComponent, majorTripRouteView);
      // replace(this._prevMajorTripCostViewComponent, majorTripCostView);
    }
    this.initStats();
  }

  initStats() {
    const MenuComponent = this._prevSiteMenuComponent;
    const NewBtnComponent = this._prevNewEventBtnComponent;
    this._prevSiteMenuComponent = new TripListToggleView();
    this._prevNewEventBtnComponent = new NewEventBtnTemplate();

    if (MenuComponent === null || NewBtnComponent === null) {
      render(this._siteHeaderFilterTrip, this._prevSiteMenuComponent, RenderPosition.AFTERBEGIN); // - table stats
      render(this._siteHeaderMainTripContainer, this._prevNewEventBtnComponent, RenderPosition.BEFOREEND); // - кнопка
      this._handlePointNewFormClose();
      this._handleSiteMenuClick();
    }
    this.initStartFilter();
  }

  _handleSiteMenuClick(menuItem) {

    switch (menuItem) {
      case MenuItem.ADD_NEW_EVENT:
        this._tripPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._tripPresenter.init();
        this._tripPresenter.createPoint(this._handlePointNewFormClose);
        // this._prevNewEventBtnComponent.getElement().setAttribute(`disabled`, ``);
        // this._siteMenuComponent.getElement().querySelector(`[value=${MenuItem.ADD_NEW_EVENT}]`).disabled = true;
        break;
      case MenuItem.TABLE:
        remove(this._statisticsComponent);
        this._tripPresenter.destroy();
        this._tripPresenter.init();

        break;
      case MenuItem.STATISTICS:
        if (this._statisticsComponent !== null) {
          remove(this._statisticsComponent);
        }
        this._tripPresenter.destroy();
        this._statisticsComponent = new StatisticsView(this._pointsModel.getPoints());
        render(this._siteMainContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
        break;
    }

    this._prevSiteMenuComponent.setMenuClickHandler(this._handleSiteMenuClick);
    this._prevNewEventBtnComponent.setNewEventBtnClickHandler(this._handleSiteMenuClick);
  }

  _handlePointNewFormClose() {
    // this._siteMenuComponent.getElement().querySelector(`[id=${MenuItem.TABLE}]`).disabled = false;
    // this._siteMenuComponent.setMenuItem(MenuItem.TABLE);
    // this._newEventBtn.getElement().querySelector(`[id=${MenuItem.ADD_NEW_EVENT}]`).disabled = false;
    // this._newEventBtn.setClickBtn(MenuItem.ADD_NEW_EVENT);
  }

  initStartFilter() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new TripFilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._siteHeaderFilterTrip, this._filterComponent, RenderPosition.BEFOREEND); // everything future past
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {

    this._currentFilter = this._filterModel.getFilter();
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
