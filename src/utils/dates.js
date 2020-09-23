import moment from "moment";

export const formatTaskDueDate = (dueDate) => {
  if (!(dueDate instanceof Date)) {
    return ``;
  }

  return moment(dueDate).format(`D MMMM`);
};

export const msToTime4Stats = (durMiliseconds) => {
  let hours = (Math.floor((durMiliseconds / (1000 * 60 * 60)))).toFixed();
  return hours;
};

export const msToTime = (durMiliseconds) => {
  let days = Math.floor((durMiliseconds / (1000 * 60 * 60 * 24))).toFixed();
  if (days <= 0) {
    days = ``;
  } else {
    days = days + `D `;
  }
  let hours = (Math.floor((durMiliseconds / (1000 * 60 * 60)) % 24)).toFixed();
  if (hours <= 0) {
    hours = ``;
  } else {
    hours = hours + `H `;
  }
  let minutes = Math.floor((durMiliseconds / (1000 * 60)) % 60).toFixed();
  if (minutes <= 0) {
    minutes = ``;
  } else {
    minutes = minutes + `M `;
  }
  const duration = days + hours + minutes;
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
