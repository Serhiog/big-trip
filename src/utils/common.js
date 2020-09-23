export const getDestinationsPattern = (cities) => {
  const destinationsPattern = `^(${cities.join(`|`)})$`;

  return destinationsPattern;
};
