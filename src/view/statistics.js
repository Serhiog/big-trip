// import flatpickr from "flatpickr";
// import Chart from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import SmartView from "./smart.js";
// // import { getCurrentDate } from "../utils/task.js";
// import { countCompletedTaskInDateRange } from "../utils/statistics.js";

// const moneyCtx = document.querySelector(`.statistics__item statistics__item--money`);
// const transportCtx = document.querySelector(`.statistics__item statistics__item--transport`);
// const timeSpendCtx = document.querySelector(`.statistics__item statistics__item--time-spend`);

// // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
// const BAR_HEIGHT = 55;
// moneyCtx.height = BAR_HEIGHT * 6;
// transportCtx.height = BAR_HEIGHT * 4;
// timeSpendCtx.height = BAR_HEIGHT * 4;

// const renderTransportChart = (colorsCtx, points) => {
//   const transportChart = new Chart(transportCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//       labels: [`???? DRIVE`, `???? RIDE`, `✈️ FLY`, `????️ SAIL`],
//       datasets: [{
//         data: [4, 3, 2, 1],
//         backgroundColor: `#ffffff`,
//         hoverBackgroundColor: `#ffffff`,
//         anchor: `start`
//       }]
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 13
//           },
//           color: `#000000`,
//           anchor: 'end',
//           align: 'start',
//           formatter: (val) => `${val}x`
//         }
//       },
//       title: {
//         display: true,
//         text: `TRANSPORT`,
//         fontColor: `#000000`,
//         fontSize: 23,
//         position: `left`
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: `#000000`,
//             padding: 5,
//             fontSize: 13,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           barThickness: 44,
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           minBarLength: 50
//         }],
//       },
//       legend: {
//         display: false
//       },
//       tooltips: {
//         enabled: false,
//       }
//     }
//   });
// };

// const renderDaysChart = (daysCtx, points, startDate, endDate) => {
//   // Функция для отрисовки графика по датам
// };

// const renderMoneyChart = (daysCtx, points, startDate, endDate) => {
//   const moneyChart = new Chart(moneyCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//       labels: [`✈️ FLY`, `???? STAY`, `???? DRIVE`, `????️ LOOK`, `???? EAT`, `???? RIDE`],
//       datasets: [{
//         data: [400, 300, 200, 160, 150, 100],
//         backgroundColor: `#ffffff`,
//         hoverBackgroundColor: `#ffffff`,
//         anchor: `start`
//       }]
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 13
//           },
//           color: `#000000`,
//           anchor: 'end',
//           align: 'start',
//           formatter: (val) => `€ ${val}`
//         }
//       },
//       title: {
//         display: true,
//         text: `MONEY`,
//         fontColor: `#000000`,
//         fontSize: 23,
//         position: `left`
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: `#000000`,
//             padding: 5,
//             fontSize: 13,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           barThickness: 44,
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           minBarLength: 50
//         }],
//       },
//       legend: {
//         display: false
//       },
//       tooltips: {
//         enabled: false,
//       }
//     }
//   });
// };

// const createStatisticsTemplate = (data) => {
//   const { points, startDate, endDate } = data;
//   // const completedTaskCount = countCompletedTaskInDateRange(points, startDate, endDate);

//   return `<section class="statistics">
//   <h2>Trip statistics</h2>

//   <div class="statistics__item statistics__item--money">
//     <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
//   </div>

//   <div class="statistics__item statistics__item--transport">
//     <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
//   </div>

//   <div class="statistics__item statistics__item--time-spend">
//     <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
//   </div>
// </section>`;
// };

// export default class Statistics extends SmartView {
//   constructor(points) {
//     super();

//     this._data = {
//       points,
//       // По условиям техзадания по умолчанию интервал - неделя от текущей даты
//       startDate: (() => {
//         const date = `1`
//         return date;
//       })(),
//       endDate: `2`
//     };

//     this._colorsCart = null;
//     this._daysChart = null;

//     this._dateChangeHandler = this._dateChangeHandler.bind(this);

//     this._setCharts();
//     this._setDatepicker();
//   }

//   removeElement() {
//     super.removeElement();

//     if (this._colorsCart !== null || this._daysChart !== null) {
//       this._colorsCart = null;
//       this._daysChart = null;
//     }

//     if (this._datepicker) {
//       this._datepicker.destroy();
//       this._datepicker = null;
//     }
//   }

//   getTemplate() {
//     return createStatisticsTemplate(this._data);
//   }

//   restoreHandlers() {
//     this._setCharts();
//     this._setDatepicker();
//   }

//   _dateChangeHandler([startDate, endDate]) {
//     if (!startDate || !endDate) {
//       return;
//     }

//     this.updateData({
//       startDate,
//       endDate
//     });
//   }

//   _setDatepicker() {
//     if (this._datepicker) {
//       this._datepicker.destroy();
//       this._datepicker = null;
//     }

//     // this._datepicker = flatpickr(
//     //   this.getElement().querySelector(`.statistic__period - input`),
//     //   {
//     //     mode: `range`,
//     //     dateFormat: `j F`,
//     //     defaultDate: [this._data.startDate, this._data.endDate],
//     //     onChange: this._dateChangeHandler
//     //   }
//     // );
//   }

//   _setCharts() {
//     // if (this._colorsCart !== null || this._daysChart !== null) {
//     //   this._colorsCart = null;
//     //   this._daysChart = null;
//     // }
//     const { points, startDate, endDate } = this._data;
//     // const colorsCtx = this.getElement().querySelector(`.statistic__colors`);
//     const daysCtx = this.getElement().querySelector(`.statistics__chart--time`);

//     // this._colorsCart = renderColorsChart(colorsCtx, points);
//     this._daysChart = renderDaysChart(daysCtx, points, startDate, endDate);
//   }
// }
