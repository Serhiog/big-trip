
import { createElement } from "./util.js";

export default class MajorTripCostView {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  createMajorTripCostTemplate(points) {
    let totalPrice = 0;
    points.forEach((point) => {
      point.options.forEach((price) => {
        totalPrice += price[1];
      });
    });

    return `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
  }

  getTemplate() {
    return new MajorTripCostView().createMajorTripCostTemplate(this._points);
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
