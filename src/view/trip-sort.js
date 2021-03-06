
import Abstract from "./abstract.js";

export default class TripSortView extends Abstract {
  constructor(currentSortType) {
    super();
    this._toChangeSort = this._toChangeSort.bind(this);
    this._currentSortType = currentSortType;
    this.setCheckedAttribute();
  }

  createTripSortTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">${this._currentSortType === `sort-event` ? `Day` : ``}</span>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event">
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">
        Time
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"></path>
        </svg>
      </label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">
        Price
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"></path>
        </svg>
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`;
  }

  getTemplate() {
    return this.createTripSortTemplate();
  }

  _toChangeSort(evt) {
    evt.preventDefault();
    this._callback.sortHandler(evt.target.getAttribute(`for`));
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortHandler = callback;
    document.querySelectorAll(`.trip-sort__btn`).forEach((element) => {
      element.addEventListener(`click`, this._toChangeSort);
    });
  }

  setCheckedAttribute() {
    this.getElement().querySelectorAll(`.trip-sort__input`).forEach((element) => {
      if (element.value === this._currentSortType) {
        element.setAttribute(`checked`, ``);
      }
    });
  }
}
