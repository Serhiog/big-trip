
import { humanizeTaskDueDate, formatedStartEndDate } from "../utils/dates.js";
import { getOptions, sortedOptiosByType } from "../mock/point.js";
import SmartView from "./smart.js";
import { remove } from "../utils/render.js";

export default class PointEditView extends SmartView {
  constructor(point) {
    super()
    this._point = point;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typesClickHandler = this._typesClickHandler.bind(this)
  }

  createTripEditTemplate(point) {
    const { type, city, photos, discription, startDate, endDate } = point;
    let citiesInSelectList = [];
    const userSelectCities = Array.from(new Set(citiesInSelectList));

    let cities = ``;
    userSelectCities.forEach((city) => {
      cities = cities + `<option value=${city}></option>`;
    });

    let photo = ``
    photos.forEach(photoElement => {
      photo = photo + `<img class="event__photo" src="${photoElement}" alt="Event photo"></img>`;
    });

    const formatedStartDate = formatedStartEndDate(startDate) + humanizeTaskDueDate(startDate);
    const formatedEndDate = formatedStartEndDate(endDate) + humanizeTaskDueDate(endDate);

    let optionTemplate = ``;

    let checked = ``;

    let optionName;
    let optionPrice;
    const fixedOptions = [];

    point.options.forEach(offer => {
      fixedOptions.push(offer)
    });

    let result = Object.values(fixedOptions).map(f => Object.values(f))



    switch (type) {
      case `Taxi`:
        break;
      case `Bus`:
        break;
      case `Train`:
        break;
      case `Ship`:
        break;
      case `Transport`:
        break;
      case `Drive`:
        break;
      case `Flight`:
        break;
      case `Check-in`:
        break;
      case `Sightseeing`:
        break;
      case `Restaurant`:
        break;
      default:
        break;
    }

    fixedOptions.slice(0, fixedOptions.length).forEach((option) => {

      optionName = option.title;
      optionPrice = option.price;
      optionTemplate += `
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage"="" ${checked}>
      <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${optionName}</span>
      +
      €&nbsp;<span class="event__offer-price">${optionPrice}</span>
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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
      <datalist id="destination-list-1">
  // ${cities}
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
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${`price`}">
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
                <p class="event__destination-description">${discription}</p>

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
    this.updateData(PointEditView.parseTaskToData(point));
  }

  static parseTaskToData(point) {
    return Object.assign({}, point, { isFavorite: point.isFavorite !== null });
  }

  getTemplate() {
    return this.createTripEditTemplate(this._point, this._points);
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

  restoreHandlers() {
    this.setEditClickHandler(this._callback.editClick);
  }

  _typesClickHandler(evt) {
    evt.preventDefault();
    this._callback.typesClick(evt);
  }

  setTypesHandler(callback) {
    this._callback.typesClick = callback;
    this.getElement().querySelectorAll(`.event__type-label`).forEach(type => {
      type.addEventListener(`click`, this._typesClickHandler);
    });
  }
}
