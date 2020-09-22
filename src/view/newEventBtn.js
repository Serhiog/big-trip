
import Abstract from "./abstract.js";
import { MenuItem } from "../consts.js";

export default class NewEventBtnTemplate extends Abstract {
  constructor() {
    super();
    this._newEventBtnClickHandler = this._newEventBtnClickHandler.bind(this);
    // this.setNewEventBtnClickHandler = this.setNewEventBtnClickHandler.bind(this)
  }

  createNewEventBtnTemplate() {
    return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" id="${MenuItem.ADD_NEW_EVENT}">New event</button>`;
  }

  getTemplate() {
    return this.createNewEventBtnTemplate();
  }

  _newEventBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.newEventBtnClick(evt.target.id);
    this.getElement().setAttribute(`disabled`, ``);
  }


  setNewEventBtnClickHandler(callback) {
    this._callback.newEventBtnClick = callback;
    this.getElement().addEventListener(`click`, this._newEventBtnClickHandler);
  }

  setClickBtn(menuItem) {
    // const item = this.getElement().querySelector(`[value=${menuItem}]`);

    // if (item !== null) {
    //   item.setAttribute(`disabled`, ``)
    //   // item.setAttribute(`checked`, ``)
    // }
  }
  setBtnDisabled() {
    console.log(`log`);
    this.getElement().setAttribute(`disabled`, ``);
    console.log(this.getElement());
  }
}
