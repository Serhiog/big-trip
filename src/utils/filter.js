import { FilterType } from "../consts.js";

const dateNow = new Date().getTime();
export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.startDate.getTime() > dateNow),
  [FilterType.PAST]: (points) => points.filter((point) => point.startDate.getTime() < dateNow)
};
