
import Abstract from "./abstract.js";

export default class TripListToggleView extends Abstract {

  createToggleViewListTripTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;
  }

  getTemplate() {
    return this.createToggleViewListTripTemplate();
  }
}
