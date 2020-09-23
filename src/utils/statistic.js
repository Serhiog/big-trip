
export const makeItemsUniq = (items) => [...new Set(items)];


export const countPointsByType = (points, point) => {
  return points.filter((typeOfTrip) => typeOfTrip.type === point.toLowerCase()).length;
}
export const countPointsByPrice = (points, point) => {
  return points.filter((typeOfTrip) => typeOfTrip.type === point.toLowerCase());
};

export const eventTypeToEmojiMap = [
  { id: `TAXI`, icon: `🚕` },
  { id: `BUS`, icon: `🚌` },
  { id: `TRAIN`, icon: `🚂` },
  { id: `SHIP`, icon: `🛳️` },
  { id: `TRANSPORT`, icon: `🚆` },
  { id: `DRIVE`, icon: `🚗` },
  { id: `FLIGHT`, icon: `✈️` },
  { id: `CHECK-IN`, icon: `🏨` },
  { id: `SIGHTSEEING`, icon: `🏛️` },
  { id: `RESTAURANT`, icon: `🍴` },
];
