
import Abstract from "./abstract.js";
import { MenuItem } from "../consts.js";

export default class TripListToggleView extends Abstract {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    document.querySelectorAll(`.trip-tabs__btn`).forEach(element => {
      element.addEventListener(`click`, this._menuClickHandler);
    });
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }

  createToggleViewListTripTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" id="${MenuItem.STATISTICS}">Stats</a>
  </nav>`;
  }

  getTemplate() {
    return this.createToggleViewListTripTemplate();
  }
}
