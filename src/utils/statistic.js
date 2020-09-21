import moment from "moment";
// import {isDatesEqual} from "./task.js";
// import {Color} from "../const.js";

// export const colorToHex = {
//   [Color.BLACK]: `#000000`,
//   [Color.BLUE]: `#0c5cdd`,
//   [Color.GREEN]: `#31b55c`,
//   [Color.PINK]: `#ff3cb9`,
//   [Color.YELLOW]: `#ffe125`
// };

// Используем особенности Set, чтобы удалить дубли в массиве
export const makeItemsUniq = (items) => [...new Set(items)];

// export const parseChartDate = (date) => moment(date).format(`D MMM`);

export const countPointsByType = (points, point) => {
  return points.filter((typeOfTrip) => typeOfTrip.type === point.toLowerCase()).length;
}
export const countPointsByPrice = (points, point) => {
  return points.filter((typeOfTrip) => typeOfTrip.type === point.toLowerCase());
};

// export const eventTypeToEmojiMap = [
//   [`🚕 ` + `TAXI`],
//   [`🚌 ` + `BUS`],
//   [`🚂 ` + `TRAIN`],
//   [`🛳️ ` + `SHIP`],
//   [`🚆 ` + `TRANSPORT`],
//   [`🚗 ` + `DRIVE`],
//   [`✈️ ` + `FLIGHT`],
//   [`🏨 ` + `CHECK_IN`],
//   [`🏛️ ` + `SIGHTSEEING`],
//   [`🍴 ` + `RESTAURANT`],
// ];

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

// export const countTasksInDateRange = (dates, tasks) => {
//   return dates.map(
//     (date) => tasks.filter(
//       (task) => isDatesEqual(task.dueDate, date)
//     ).length
//   );
// };

// export const countCompletedTaskInDateRange = (tasks, dateFrom, dateTo) => {
//   return tasks.reduce((counter, task) => {
//     if (task.dueDate === null) {
//       return counter;
//     }

//     // С помощью moment.js проверям, сколько задач с дедлайном
//     // попадают в диапазон дат
//     if (
//       moment(task.dueDate).isSame(dateFrom) ||
//       moment(task.dueDate).isBetween(dateFrom, dateTo) ||
//       moment(task.dueDate).isSame(dateTo)
//     ) {
//       return counter + 1;
//     }

//     return counter;
//   }, 0);
// };

// export const getDatesInRange = (dateFrom, dateTo) => {
//   const dates = [];
//   let stepDate = new Date(dateFrom);

  // Нам нужно получить все даты из диапазона,
  // чтобы корректно отразить их на графике.
  // Для этого проходим в цикле от даты "от"
  // до даты "до" и каждый день, что между,
  // заносим в результирующий массив dates
//   while (moment(stepDate).isSameOrBefore(dateTo)) {
//     dates.push(new Date(stepDate));
//     stepDate.setDate(stepDate.getDate() + 1);
//   }

//   return dates;
// };
