
import Abstract from "./abstract.js";

export default class NoPoints extends Abstract {
  constructor() {
    super();
  }

  createNoPointTemplate() {
    return `${`<p class="trip-events__msg">Click New Event to create your first point</p>`}`;
  }

  getTemplate() {
    return this.createNoPointTemplate();
  }
}

