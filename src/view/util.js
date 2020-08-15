
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDate = (date) => {
  return date.toISOString().split('T')[1].slice(0, 5);
};


export const msToTime = (durMilisecunds) => {
  let minutes = Math.floor((durMilisecunds / (1000 * 60)) % 60);
  minutes <= 0 ? minutes = `` : minutes = minutes + `M `;
  let hours = Math.floor((durMilisecunds / (1000 * 60 * 60)) % 24);
  hours <= 0 ? hours = `` : hours = hours + `H `;
  let days = Math.floor((durMilisecunds / (1000 * 60 * 60 * 24)));
  days <= 0 ? days = `` : days = days + `D `;
  return {
    hours,
    minutes,
    days,
  };
};

export const date4User = (date) => {
  return new Date(date).toDateString().slice(4, 10);
};

export const date4UserEnd = (date) => {
  return date.split(` `).join().slice(4, 6);
};

export const tripStartEndDates = (date) => {
  return date.toLocaleDateString().split(`.`).join(`/`);
}

export const formatedStartEndDate = (date) => {
  return tripStartEndDates(date).slice(0, 5) + `/` + date.getUTCFullYear().toString().slice(2, 4)
}
