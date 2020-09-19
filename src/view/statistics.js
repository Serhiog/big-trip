
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Abstract from "./abstract.js";
import {
  countCompletedTaskInDateRange,
  makeItemsUniq,
  countPointsByType,
  countPointsByPrice,
  colorToHex,
  countTasksInDateRange,
  parseChartDate,
  getDatesInRange
} from "../utils/statistic.js";

const BAR_HEIGHT = 55;

const renderTransportChart = (transportCtx, points) => {

  const pointTypes = points.map((point) => point.type.toUpperCase());
  const uniqTypes = makeItemsUniq(pointTypes);
  const pointByTypeCount = uniqTypes.map((point) => countPointsByType(points, point))

  transportCtx.height = BAR_HEIGHT * uniqTypes.length - 1;
  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: pointByTypeCount,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderMoneyChart = (moneyCtx, points) => {
  const pointPrices = points.map((point) => point.price); // - все цены
  console.log(points);
  console.log(`все цены: ` + pointPrices);
  const pointTypes = points.map((point) => point.type.toUpperCase()); // все типы
  console.log(`все типы: ` + pointTypes);
  const uniqTypes = makeItemsUniq(pointTypes); // уникальные типы
  console.log(`уникальные типы: ` + uniqTypes);

  const pointByPriceSum = uniqTypes.map((point) => countPointsByPrice(points, point));
  // console.log(pointByPriceSum);
  pointByPriceSum.forEach(element => {
    console.log(element);
  });

  moneyCtx.height = BAR_HEIGHT * pointByPriceSum.length - 1;
  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTypes,
      datasets: [{
        data: [400, 300, 200, 160, 150, 100],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, points) => {
  timeCtx.height = BAR_HEIGHT * 6;
  const timeChart = new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`✈️ FLY`, `???? STAY`, `???? DRIVE`, `????️ LOOK`, `???? EAT`, `???? RIDE`],
      datasets: [{
        data: [400, 300, 200, 160, 150, 100],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
    <h2>Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

export default class Statistics extends Abstract {
  constructor(points) {
    super();
    this._renderCharts(points);
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _renderCharts(points) {
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    renderTransportChart(transportCtx, points);
    renderMoneyChart(moneyCtx, points);
    renderTimeChart(timeSpendCtx, points);
  }

}
