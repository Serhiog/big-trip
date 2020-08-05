export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const setTypeofPoint = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
}

export const setCities = () => {
  const cities = [`Berlin`, `Paris`, `Tallin`, `Belfast`]
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex]
};

const setExtras = (type) => {
  if (type === `Flight` && type === `Ship` && type === `Bus`) {
    return {
      luggage: [`Add luggage`, 30],
      comfort: [`Switch to comfort class`, 100],
      meal: [`Add meal`, 15],
      seats: [`Choose seats`, 5],
      train: [`Travel by train`, 40],
    };
  } else {
    return {
      uber: [`Order Uber`, 20],
      rent: [`Rent a car`, 200],
      breakfast: [`Add breakfast`, 50],
    };
  }
};

const setDiscription = () => {
  const discriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const splittedText = discriptionText.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length - 1);
  return splittedText.slice(0, randomIndex);
};

const setDurationTripTime = () => {

};

export const point = () => {
  return {
    setTypeofPoint,
    setCities,
    setExtras,
    setDiscription,
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    setDurationTripTime,
  }
};


