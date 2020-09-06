import { FilterType } from "../consts.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => !point.isArchive),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.isFavorite),
  [FilterType.PAST]: (points) => points.filter((point) => point.city === `Paris`)
};
