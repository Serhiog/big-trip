

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getTypeOfPoint = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
}

const getCities = () => {
  const cities = [`Berlin`, `Paris`, `Tallin`, `Belfast`]
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const getExtras = () => {

  const services = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`];
  const prices = [30, 100, 15, 5, 40]

  return [services[getRandomInteger(0, services.length - 1)], prices[getRandomInteger(0, prices.length - 1)]];
};

const getDiscription = () => {
  const discriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const splittedText = discriptionText.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length - 1);
  return splittedText[randomIndex];
};

const getDurationTripTime = () => {
  let startHours = getRandomInteger(0, 24);
  let startMinutes = getRandomInteger(0, 60);
  if (startMinutes < 10) {
    startMinutes = `0${startMinutes}`;
  }
  let endHours = getRandomInteger(0, 24);
  let endMinutes = getRandomInteger(0, 60);
  if (endMinutes < 10) {
    endMinutes = `0${endMinutes}`;
  }
  if (startHours > endHours) {
    startHours = endHours;
    endHours = `23`;
  }
  let firstDate = `${startHours}:${startMinutes}`;
  let secondDate = `${endHours}:${endMinutes}`;

  let getDate = (string) => new Date(0, 0, 0, string.split(`:`)[0], string.split(`:`)[1]);
  let different = (getDate(secondDate) - getDate(firstDate));

  let hours = Math.floor((different % 86400000) / 3600000);
  let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
  let result = hours + `H` + ` ` + minutes + `M`;

  return { firstDate, secondDate, result };
};

export const point = () => {
  const { firstDate, secondDate, result } = getDurationTripTime();
  return {
    type: getTypeOfPoint(),
    cities: getCities(),
    extras: getExtras(),
    discription: getDiscription(),
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    firstDate,
    secondDate,
    result
  };
};
