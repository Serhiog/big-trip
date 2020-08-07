const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getTypeOfPoint = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
}

const getCities = () => {
  const cities = [`Berlin`, `Paris`, `Tallin`, `Belfast`]
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const getExtras = () => {

  const services = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Travel by train`];
  const prices = [30, 100, 15, 5, 40];
  const randomOfServices = getRandomInteger(0, services.length - 1);
  const prepareForServices = services.slice(0, randomOfServices);
  const finalServices = [].slice.call(prepareForServices);
  let finalPrices = prices[getRandomInteger(0, prices.length - 1)];

  return [finalServices, finalPrices];
};

const getDiscription = () => {
  const discriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const splittedText = discriptionText.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length - 1);
  return splittedText[randomIndex];
};

const generateDate = (date) => {
  return new Date(date.getTime() + getRandomInteger(1, 30) * 60 * 60 * 1000);
}

const t1 = generateDate(new Date());
const t2 = generateDate(t1);


const generatePhotos = () => {
  const randomPhotos = [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`];
  return randomPhotos;
};

export const point = () => {
  return {
    type: getTypeOfPoint(),
    cities: getCities(),
    extrasServices: getExtras()[0],
    finalPrices: getExtras()[1],
    discription: getDiscription(),
    photos: generatePhotos(),
    timeStart: t1,
    timeEnd: t2,
  };
};
