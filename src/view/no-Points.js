
import Abstract from "./abstract.js";

export default class NoPoints extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  createNoPointTemplate() {
    return `${!this._points.length ? `<p class="trip-events__msg">Click New Event to create your first point</p>` : `<span></span>`}`;
  }

  getTemplate() {
    return this.createNoPointTemplate();
  }
}

