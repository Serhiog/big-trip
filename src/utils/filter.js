import { FilterType } from "../consts.js";

const dateNow = new Date().getTime();
export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.startDate.getTime() > dateNow),
  [FilterType.PAST]: (points) => points.filter((point) => point.startDate.getTime() < dateNow)
};

export const compare = (a, b) => {
  if (a.startDate.getTime() > b.startDate.getTime()) {
    return 1;
  }
  if (a.startDate.getTime() == b.startDate.getTime()) {
    return 0;
  } // если равны
  if (a.startDate.getTime() < b.startDate.getTime()) {
    return -1;
  }
};
