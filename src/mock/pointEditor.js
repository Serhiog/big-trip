import { createTripEventEditContainerTemplate } from "../view/tripEventEditContainer.js";
import { createTripEditorHeaderTemplate } from "../view/tripEditorHeader.js";
import { createTripEditorDetailsTemplate } from "../view/tripEditorDetails.js";
import { render } from "../view/util.js";

export const createTripEditTemplate = () => {

  let editorContainer = document.querySelector('.event')
  editorContainer.remove();

  let editorWrapper = document.querySelector('.trip-events__item')
  render(editorWrapper, createTripEventEditContainerTemplate(), `afterbegin`)
  const eventEdit = document.querySelector(`.event--edit`)
  render(eventEdit, createTripEditorHeaderTemplate(), `afterbegin`)
  render(eventEdit, createTripEditorDetailsTemplate(), `beforeend`)

};

