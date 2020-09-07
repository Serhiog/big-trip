
import { formatTaskDueDate, formatedStartEndDate } from "../utils/dates.js";
import { getOptions, sortedOptiosByType, allOffers, allDestinations } from "../mock/point.js";
import SmartView from "./smart.js";
import { remove } from "../utils/render.js";
import { CITIES } from "../consts.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import { UserAction, UpdateType } from "../consts.js";
import he from "he";



export default class PointEditView extends SmartView {
  constructor(point) {
    super();
    this._data = PointEditView.parsePointToData(point);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typesClickHandler = this._typesClickHandler.bind(this);
    this._citiesClickHandler = this._citiesClickHandler.bind(this);
    this._tripStartDateChangeHandler = this._tripStartDateChangeHandler.bind(this);
    this._tripEndDateChangeHandler = this._tripEndDateChangeHandler.bind(this);
    this.setDeleteClickHandler = this.setDeleteClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this.setEditClickHandler = this.setEditClickHandler.bind(this);
    this._formSubmitPoint = this._formSubmitPoint.bind(this);
    this._formSetPrice = this._formSetPrice.bind(this);
    this.setTypesHandler();
    this.setCitiesHandler();
    this._startDatePicker = null;
    this._endtDatePicker = null;
    this._setStartDatePicker();
    this._setEndDatePicker();
    this.setPrice();
  }

  _setStartDatePicker() {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }

    if (this._data.startDate) {
      this._startDatePicker = flatpickr(this.getElement().querySelector(`#event-start-time-1`), { dateFormat: `j F`, defaultDate: this._data.startDate, onChange: this._tripStartDateChangeHandler }
      );
    }
  }

  _tripStartDateChangeHandler([userDate]) {
    userDate.setHours(23, 59, 59, 999);

    this.updateData({
      startDate: userDate
    });
  }

  _setEndDatePicker() {
    if (this._endtDatePicker) {
      this._endtDatePicker.destroy();
      this._endtDatePicker = null;
    }

    if (this._data.endDate) {
      this._endtDatePicker = flatpickr(this.getElement().querySelector(`#event-end-time-1`), { dateFormat: `j F`, defaultDate: this._data.endDate, onChange: this._tripEndDateChangeHandler }
      );
    }
  }

  _tripEndDateChangeHandler([userDate]) {
    userDate.setHours(23, 59, 59, 999);

    this.updateData({
      endDate: userDate
    });
  }

  createTripEditTemplate(point) {

    const { type, city, destination: { pictures, description }, price, startDate, endDate, options } = point;

    let cities = ``;
    CITIES.forEach(city => {
      cities += `<option value=${city}></option>`;
    });


    let photo = ``;
    pictures.forEach(photoElement => {
      photo = photo + `<img class="event__photo" src="${photoElement.src}" alt="${photoElement.description}"></img>`;
    });

    const formatedStartDate = formatedStartEndDate(startDate) + formatTaskDueDate(startDate);
    const formatedEndDate = formatedStartEndDate(endDate) + formatTaskDueDate(endDate);

    let optionTemplate = ``;

    const fixedOptions = allOffers[type[0].toUpperCase() + type.substring(1)].offers;
    let totalOffersPrice = 0;

    fixedOptions.slice(0, fixedOptions.length).forEach((offer) => {
      let checked = ``;
      const offerName = offer.title;
      const offerPrice = offer.price;

      options.forEach((option) => {
        if (option.title === offerName) {
          checked = `checked`;
          totalOffersPrice += offer.price;
        }
      });


      optionTemplate += `
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage"="" ${checked}>
      <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offerName}</span>
      +
      €&nbsp;<span class="event__offer-price">${offerPrice}</span>
      </label>
      </div>
      `  })

    return `<form class="event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>
        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type.toLowerCase()} to
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(city)}" list="destination-list-1">
      <datalist id="destination-list-1">
      ${cities}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${formatedStartDate}>—<label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${formatedEndDate}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${point.isFavorite ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>

  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
  ${optionTemplate}
      </div>
    </section>
    <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                     ${photo}

                  </div>
                </div>
              </section>
  </section>
  </form>`;
  }

  reset(point) {
    this.updateData(PointEditView.parsePointToData(point));
  }

  static parsePointToData(point) {
    return Object.assign({}, point, {});
  }

  static parseDataToPoint(point) {
    return Object.assign({}, point, {});
  }

  // static(point) {
  //   return Object.assign({}, point, {});
  // }

  getTemplate() {
    return this.createTripEditTemplate(this._data);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  removeEditClickHandler() {
    this.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, this._editClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setfavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  removeFavoriteClickHandler() {
    this.getElement().querySelector(`.event__favorite-btn`).removeEventListener(`click`, this._favoriteClickHandler);
  }

  _typesClickHandler(evt) {
    evt.preventDefault();
    const type = evt.target.previousElementSibling.value;
    this.updateData({
      type
    })
  }

  setTypesHandler() {
    this.getElement().querySelectorAll(`.event__type-label`).forEach(type => {
      type.addEventListener(`click`, this._typesClickHandler);
    });
  }

  _citiesClickHandler(evt) {
    evt.preventDefault();
    const city = evt.target.value;
    this.updateData({
      destination: allDestinations[city],
      city
    });
  }

  setCitiesHandler() {
    this.getElement().querySelector(`#event-destination-1`).addEventListener(`change`, this._citiesClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEditView.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _formSubmitPoint(evt) {
    evt.preventDefault();
    this._callback.submitPoint(PointEditView.parseDataToPoint(this._data));
  }

  submitPoint(callback) {
    this._callback.submitPoint = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._formSubmitPoint);
  }

  _formSetPrice(evt) {
    evt.preventDefault();
    const userPrice = evt.target.value;
    this.updateData({
      price: userPrice
    });
  }

  setPrice() {
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._formSetPrice);
  }

  restoreHandlers() {
    this.setTypesHandler();
    this.setCitiesHandler();
    this._setStartDatePicker();
    this._setEndDatePicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setEditClickHandler(this._callback.editClick);
    this.setfavoriteClickHandler(this._callback.favoriteClick);
    this.submitPoint(this._callback.submitPoint);
    this.setPrice(this._formSetPrice);
  }
}

