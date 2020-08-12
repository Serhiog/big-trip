
export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const humanizeTaskDueDate = (date) => {
  return date.toISOString().split('T')[1].slice(0, 5);
};


export const msToTime = (durMilisecunds) => {
  let minutes = Math.floor((durMilisecunds / (1000 * 60)) % 60);
  let hours = Math.floor((durMilisecunds / (1000 * 60 * 60)) % 24);
  let days = Math.floor((durMilisecunds / (1000 * 60 * 60 * 24)) % 24);
  return {
    hours,
    minutes,
    days,
  };
};

export let date4User = (date) => {
  return new Date(date).toDateString().slice(4, 10);
};

export let date4UserEnd = (date) => {
  return date.split(` `).join().slice(4, 6);
};

