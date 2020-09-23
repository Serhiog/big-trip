import moment from "moment";

export const countCompletedpointInDateRange = (points, dateFrom, dateTo) => {
  return points.reduce((counter, point) => {
    if (point.dueDate === null) {
      return counter;
    }

    if (
      moment(point.dueDate).isSame(dateFrom) ||
      moment(point.dueDate).isBetween(dateFrom, dateTo) ||
      moment(point.dueDate).isSame(dateTo)
    ) {
      return counter + 1;
    }

    return counter;
  }, 0);
};
