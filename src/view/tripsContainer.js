
import Abstract from "./abstract.js";

export default class TripsContainerView extends Abstract {

  createTripsContainerTemplate() {
    return `<ul class="trip-days">
    </ul>`;
  }

  getTemplate() {
    return this.createTripsContainerTemplate();
  }
}
