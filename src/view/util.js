

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDate = (date) => {
  return date.toISOString().split('T')[1].slice(0, 5);
};

