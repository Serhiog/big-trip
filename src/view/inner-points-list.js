import Abstract from "./abstract.js";

export default class InnerTripPointList extends Abstract {

  innerListPointsTemplate() {
    return `<ul class="trip-events__list">
            </ul>`;
  }


  getTemplate() {
    return this.innerListPointsTemplate();
  }
}
