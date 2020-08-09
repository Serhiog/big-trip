

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
  const cities = [`Berlin`, `Paris`, `Tallin`, `Belfast`];
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const setOfExtras = new Map();
setOfExtras.set(` Add luggage`, 30);
setOfExtras.set(` Switch to comfort class`, 100);
setOfExtras.set(` Add meal`, 15);
setOfExtras.set(` Choose seats`, 5);
setOfExtras.set(` Travel by train`, 40);

let finalServices = Array.from(setOfExtras.keys())
let finalPrices = Array.from(setOfExtras.values())

const getDiscription = () => {
  const discriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const splittedText = discriptionText.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length - 1);
  return splittedText[randomIndex];
};


const generatePhotos = () => {
  const randomPhotos = [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`];
  return randomPhotos;
};


export const point = () => {
  return {
    type: getTypeOfPoint(),
    cities: getCities(),
    finalServices,
    finalPrices,
    discription: getDiscription(),
    photos: generatePhotos(),
  };
};
