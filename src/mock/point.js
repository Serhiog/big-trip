import { TYPES, CITIES } from "../consts.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getTypeOfPoint = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const getcity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};


export const getOptions = () => {
  const options = [
    [`Add luggage`, 30], [`Switch to comfort`, 100], [`Add meal`, 15], [`Choose seats`, 5], [`Travel by train`, 40]
  ];
  const fixedOptions = [...options];

  return {
    options: options.slice(0, getRandomInteger(0, options.length)),
    fixedOptions,
  };
};

const getDiscription = () => {
  const discriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const splittedText = discriptionText.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length);
  return splittedText.slice(0, randomIndex).join();
};


const generatePhotos = () => {
  const randomPhotos = [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`];
  return randomPhotos;
};


const generateDate = (date) => {
  return new Date(date.getTime() + getRandomInteger(1, 30) * 60 * 60 * 1000);
};

const point = (date) => {
  const time1 = generateDate(date);
  const time2 = generateDate(time1);

  return {
    type: getTypeOfPoint(),
    city: getcity(),
    price: getRandomInteger(25, 150),
    options: getOptions().options,
    discription: getDiscription(),
    photos: generatePhotos(),
    startDate: time1,
    endDate: time2,
    id: generateId(),
    id2: generateId(),
    isFavorite: false,
  };
};


export const generateMocks = (size) => {
  const mocks = [];
  let date = new Date();

  for (let i = 0; i < size; i++) {
    const p = point(date);
    p.id = i;
    date = p.endDate;
    mocks.push(p);
  }

  return mocks;
};
