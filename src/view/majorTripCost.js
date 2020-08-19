
import Abstract from "./abstract.js";


export default class MajorTripCostView extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  createMajorTripCostTemplate(points) {
    if (points.length === 0) {
      return ` `;
    }
    let totalPrice = 0;

    points.forEach((point) => {
      totalPrice += point.price;
      point.options.forEach((price) => {
        totalPrice += price[1];
      });
    });

    return `<p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
  }

  getTemplate() {
    return this.createMajorTripCostTemplate(this._points);
  }
}
