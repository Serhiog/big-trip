
import Abstract from "./abstract.js";
import {MenuItem} from "../consts.js";

export default class TripListToggleView extends Abstract {
  constructor(isEnable) {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._isEnable = isEnable;
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((element) => {
      element.addEventListener(`click`, this._menuClickHandler);
    });
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[id=${menuItem}]`);
    if (item !== null) {
      item.setAttribute(`checked`, ``);
    }
  }

  createToggleViewListTripTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" id="${MenuItem.STATISTICS}">Stats</a>
  </nav>`;
  }

  getTemplate() {
    return this.createToggleViewListTripTemplate();
  }

  setActiveBtn(btn) {
    switch (btn) {
      case `STATISTICS`:
        this.getElement().querySelector(`#TABLE`).classList.remove(`trip-tabs__btn--active`);
        this.getElement().querySelector(`#STATISTICS`).classList.add(`trip-tabs__btn--active`);
        break;

      case `TABLE`:
        this.getElement().querySelector(`#STATISTICS`).classList.remove(`trip-tabs__btn--active`);
        this.getElement().querySelector(`#TABLE`).classList.add(`trip-tabs__btn--active`);
        break;
      default:
        this.getElement().querySelector(`#STATISTICS`).classList.remove(`trip-tabs__btn--active`);
        this.getElement().querySelector(`#TABLE`).classList.add(`trip-tabs__btn--active`);
        break;
    }
  }
}
