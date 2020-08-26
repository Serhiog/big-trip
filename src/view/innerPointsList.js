import Abstract from "./abstract.js";

export default class InnerTripPointList extends Abstract {
  constructor(group = ``, dayNumber = ``) {
    super();
    this._group = group;
    this._dayNumber = dayNumber;
  }


  innerListPointsTemplate() {
    return `<ul class="trip-events__list">
            </ul>`;
  }


  getTemplate() {
    return this.innerListPointsTemplate();
  }
}
