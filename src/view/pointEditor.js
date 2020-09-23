import {formatTaskDueDate, formatedStartEndDate} from "../utils/dates";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import {TYPES, EXTRA_TYPES} from "../consts.js";
import {getDestinationsPattern} from '../utils/common'
import he from "he";

export default class PointEditView extends SmartView {
  constructor(point, offers, destinations, isNew) {
    super();
    this._point = point;
    this._isNew = isNew;
    this._offers = offers;
    this._destinations = destinations;
    this._data = PointEditView.parsePointToData(this._point);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typesClickHandler = this._typesClickHandler.bind(this);
    this._citiesClickHandler = this._citiesClickHandler.bind(this);
    this._offersClickHandler = this._offersClickHandler.bind(this);
    this._tripStartDateChangeHandler = this._tripStartDateChangeHandler.bind(this);
    this._tripStartDateCloseHandler = this._tripStartDateCloseHandler.bind(this);
    this._tripEndDateChangeHandler = this._tripEndDateChangeHandler.bind(this);
    this._tripEndDateCloseHandler = this._tripEndDateCloseHandler.bind(this);
    this.setDeleteClickHandler = this.setDeleteClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this.setEditClickHandler = this.setEditClickHandler.bind(this);
    this.setOffersHandler = this.setOffersHandler.bind(this);
    this.setTypesHandler = this.setTypesHandler.bind(this);
    this._formSubmitPoint = this._formSubmitPoint.bind(this);
    this._formSetPrice = this._formSetPrice.bind(this);
    this.setTypesHandler();
    this.setCitiesHandler();
    this._startDatePicker = null;
    this._endtDatePicker = null;
    this._setStartDatePicker();
    this._setEndDatePicker();
    this.setPrice();
    this.setOffersHandler();
  }

  _setStartDatePicker() {
    if (this._startDatePicker) {
      this._startDatePicker.destroy();
      this._startDatePicker = null;
    }

    if (this._data.startDate) {
      this._startDatePicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            enableTime: true,
            maxDate: this._data.endDate,
            // eslint-disable-next-line
            time_24hr: true,
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.startDate,
            onChange: this._tripStartDateChangeHandler,
            onClose: this._tripStartDateCloseHandler
          }
      );
    }
  }

  _tripStartDateChangeHandler([userDate]) {
    this._endtDatePicker.set(`minDate`, userDate);
  }

  _tripStartDateCloseHandler([userDate]) {
    this.updateData({
      startDate: userDate
    });
  }

  _tripStartDateCloseHandler([userDate]) {
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
      this._endtDatePicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            enableTime: true,
            minDate: this._data.startDate,
            // eslint-disable-next-line
            time_24hr: true,
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.endDate,
            onChange: this._tripEndDateChangeHandler,
            onClose: this._tripEndDateCloseHandler
          }
      );
    }
  }

  _tripEndDateCloseHandler([userDate]) {
    this.updateData({
      endDate: userDate
    });
  }

  _tripEndDateChangeHandler([userDate]) {
    this._startDatePicker.set(`maxDate`, userDate);
  }

  _tripEndDateCloseHandler([userDate]) {
    this.updateData({
      endDate: userDate
    });
  }

  createTripEditTemplate(point) {
    const {type, price, startDate, endDate} = point;
    let citiesList = ``;
    let cityNames = ``;

    if (!this._destinations) {
      cityNames = ``;
    } else {
      this._destinations.forEach((place) => {
        cityNames += `<option value=${place.name}></option>`;
      });
    }
    const cities = this._destinations.map((destination) => destination.name);

    const typeTrip = this._data.type[0].toUpperCase() + this._data.type.substring(1);
    const typeCompare = (pointType) => pointType === this._data.type;
    const favoriteIcon = `
      <input id="event-favorite-1" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite" ${point.isFavorite ? `checked` : ``}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </label>
    `;
    const rollupButton = `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

    citiesList = `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${typeTrip} ${EXTRA_TYPES.some(typeCompare) ? `in` : `to`}
      </label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1" type="text"
        name="event-destination"
        value="${he.encode(this._data.city)}"
        required
        pattern="${getDestinationsPattern(cities)}"
        list="destination-list-1">
      <datalist id="destination-list-1">
        ${cityNames}
      </datalist>
    </div>`;


    let aboutPoint = ``;
    if (this._data === null) {
      aboutPoint = ``;
    } else {
      let placePhoto = ``;
      this._data.destination.pictures.forEach((place) => {
        placePhoto += `<img class="event__photo" src="${place.src}" alt="${place.description}">`;
      });
      aboutPoint = `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">${this._data.city === `` ? `` : `Destination`}</h3>
        <p class="event__destination-description">${this._data.destination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${placePhoto}
          </div>
        </div>
      </section>`;
    }

    const formatedStartDate = formatedStartEndDate(startDate) + formatTaskDueDate(startDate);
    const formatedEndDate = formatedStartEndDate(endDate) + formatTaskDueDate(endDate);

    let optionTemplate = ``;

    const fixedOptions = this._offers.find((offer) => {
      return offer.type === type.toLowerCase();
    }).offers;

    fixedOptions.forEach((option) => {
      let checked = ``;

      point.options.forEach((element) => {
        if (element.title === option.title) {
          checked = `checked`;
        }
      });
      optionTemplate += `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${option.title}" type="checkbox" name="${option.title}" data-price="${option.price}" ${checked}>
        <label class="event__offer-label" for="${option.title}"><span class="event__offer-title">${option.title}</span> + €&nbsp;<span class="event__offer-price">${option.price}</span>
        </label>
      </div>`;
    });

    let optionsContainer = ``;

    if (!fixedOptions.length) {
      optionsContainer = ``;
    } else {
      optionsContainer = `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${optionTemplate}
          </div>
        </section>`;
    }

    let types = ``;

    const currentType = this._data.type;

    TYPES.forEach((element) => {
      let checked = ``;
      if (currentType === element) {
        checked = `checked`;
      }
      types += `<div class="event__type-item">
        <input id="event-type-${element.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}" ${checked}>
        <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}-1" ${``}>${element[0].toUpperCase() + element.substring(1)}</label>
      </div>`;
    });

    let extraTypes = ``;
    EXTRA_TYPES.forEach((element) => {
      let checked = ``;
      if (currentType === element) {
        checked = `checked`;
      }
      extraTypes += `<div class="event__type-item">
        <input id="event-type-${element.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}" ${checked}>
        <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}-1" ${``}>${element[0].toUpperCase() + element.substring(1)}</label>
      </div>`;
    });


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
              ${types}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${extraTypes}
            </fieldset>
          </div>
        </div>
        ${citiesList}
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${formatedStartDate}>—<label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${formatedEndDate}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span> €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" required name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${this._isNew ? `Cancel` : `Delete`}</button>
        ${this._isNew ? `` : favoriteIcon}
        ${this._isNew ? `` : rollupButton}
      </header>
      <section class="event__details">
        ${optionsContainer}
        ${aboutPoint}
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

  getTemplate() {
    return this.createTripEditTemplate(this._data);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    if (this._isNew) {
      return;
    }

    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    if (this._isNew) {
      return;
    }

    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  removeFavoriteClickHandler() {
    this.getElement().querySelector(`.event__favorite-btn`).removeEventListener(`click`, this._favoriteClickHandler);
  }

  _typesClickHandler(evt) {
    evt.preventDefault();
    const type = evt.target.previousElementSibling.value;
    evt.target.previousElementSibling.setAttribute(`checked`, ``);
    this.updateData({
      type,
      options: []
    });
  }

  setTypesHandler() {
    this.getElement().querySelectorAll(`.event__type-label`).forEach((type) => {
      type.addEventListener(`click`, this._typesClickHandler);
    });
  }

  _offersClickHandler() {
    const offers = [];
    const checkedOffers = this.getElement().querySelectorAll(`.event__offer-checkbox:checked`);
    checkedOffers.forEach((element) => {
      const optionsPoint = {
        title: element.getAttribute(`id`),
        price: +element.getAttribute(`data-price`),
      };
      offers.push(optionsPoint);
    });
    this.updateData({options: offers});
  }

  setOffersHandler() {
    this.getElement().querySelectorAll(`.event__offer-checkbox`).forEach((offer) => {
      offer.addEventListener(`click`, this._offersClickHandler);
    });
  }

  _citiesClickHandler(evt) {
    evt.preventDefault();
    const city = evt.target.value;
    const destination = this._destinations.find((element) => element.name === city);

    if (!destination) {
      return;
    }

    this.updateData({
      city,
      destination,
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
    this.getElement().addEventListener(`submit`, this._formSubmitPoint);
  }

  _formSetPrice(evt) {
    evt.preventDefault();
    const userPrice = evt.target.value;
    this.updateData({
      price: userPrice
    }, true);
  }

  setPrice() {
    this.getElement().querySelector(`.event__input--price`).addEventListener(`change`, this._formSetPrice);
  }

  changeNameSaveBtn(newName) {
    switch (newName) {
      case `Saving`:
        this.getElement().querySelector(`.event__save-btn`).textContent = newName;
        break;
      case `Deleting`:
        this.getElement().querySelector(`.event__reset-btn`).textContent = newName;
        break;
    }
  }

  setdisabledSelects() {
    this.getElement().querySelectorAll(`input`).forEach((input) => {
      input.setAttribute(`disabled`, ``);
    });
  }

  restoreHandlers() {
    this.setCitiesHandler();
    this._setStartDatePicker();
    this._setEndDatePicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setEditClickHandler(this._callback.editClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.submitPoint(this._callback.submitPoint);
    this.setPrice(this._formSetPrice);
    this.setOffersHandler(this._offersClickHandler);
    this.setTypesHandler(this._typesClickHandler);
  }
}
