

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDateView = (date) => {
  return date.toLocaleString(`en-GB`, { hour: `numeric`, minute: `numeric` });
};
export const humanizeTaskDueDateRobot = (date) => {
  return date.toLocaleString();
};

