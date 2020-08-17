import { createElement } from "./util.js";


export default class NoPoints {
  constructor() {
    this._element = null;
  }

  createNoPointTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }

  getTemplate() {
    return this.createNoPointTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
