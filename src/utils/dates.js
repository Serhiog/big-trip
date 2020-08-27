export const humanizeTaskDueDate = (date) => {
  return date.toISOString().split(`T`)[1].slice(0, 5);
};


export const msToTime = (durMiliseconds) => {
  let minutes = Math.floor((durMiliseconds / (1000 * 60)) % 60).toFixed();
  minutes <= 0 ? minutes = `` : minutes = minutes + `M `;
  let hours = (Math.floor((durMiliseconds / (1000 * 60 * 60)) % 24)).toFixed();
  hours <= 0 ? hours = `` : hours = hours + `H `;
  let days = Math.floor((durMiliseconds / (1000 * 60 * 60 * 24))).toFixed();
  days <= 0 ? days = `` : days = days + `D `;
  const duration = hours + minutes + days;
  return duration;
};

export const date4User = (date) => {
  return new Date(date).toDateString().slice(4, 10);
};

export const date4UserEnd = (date) => {
  return date.split(` `).join().slice(4, 6);
};

export const tripStartEndDates = (date) => {
  return date.toLocaleDateString().split(`.`).join(`/`);
};

export const formatedStartEndDate = (date) => {
  return tripStartEndDates(date).slice(0, 5) + `/` + date.getUTCFullYear().toString().slice(2, 4);
};
