import { createElement } from "./util.js";

export default class TripsContainerView {
  constructor() {
    this._element = null;
  }

  createTripsContainerTemplate() {
    return `<ul class="trip-days">
    </ul>`;
  }

  getTemplate() {
    return this.createTripsContainerTemplate();
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
