import Abstract from "./abstract.js";

export default class Smart extends Abstract {
  constructor() {
    super();
    this._favoriteToggleHandler = this._favoriteToggleHandler.bind(this);
    this._setInnerHandlers();
    this._someInputHandler = this._someInputHandler.bind(this);
  }

  restoreHandlers() {
    //this._setInnerHandlers();
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteToggleHandler);
    this.getElement()
      .querySelector(`#event-price-1`)
      .addEventListener(`input`, this._priceInputHandler);
  }


  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;
    this.restoreHandlers();
  }

  _favoriteToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }
}
