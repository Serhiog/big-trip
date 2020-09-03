
import Abstract from "./abstract.js";


export default class MajorTripCostView extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  createMajorTripCostTemplate(points) {

    let totalPrice = 0;

    points.forEach((point) => {

      point.options.forEach(element => {
        totalPrice += element.price;
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
