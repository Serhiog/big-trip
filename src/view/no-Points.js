
import Abstract from "./abstract.js";

export default class NoPoints extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  createNoPointTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }

  getTemplate() {
    return this.createNoPointTemplate();
  }

  init() {
    if (!this._points.length) {
      this.getElement();
    }
  }
}

