import Abstract from "./abstract.js";


export default class EventBtnView extends Abstract {

  createEventBtnTemplate() {
    return `<div class="trip-main__trip-controls  trip-controls">
    <h2 class="visually-hidden">Switch trip view</h2>
    <h2 class="visually-hidden">Filter events</h2>
  </div>
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
  }

  getTemplate() {
    return this.createEventBtnTemplate();
  }
}
