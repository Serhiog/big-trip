
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Abstract from "./abstract.js";
import {TYPES} from "../consts.js";
import {msToTime4Stats} from "../utils/dates.js";

import {

  makeItemsUniq,
  countPointsByType,
  eventTypeToEmojiMap,
} from "../utils/statistic.js";

const BAR_HEIGHT = 55;

const renderTransportChart = (transportCtx, points) => {

  const pointTypes = points.filter((point) => TYPES.includes(point.type)).map((point) => point.type.toUpperCase());
  const uniqPointTypes = makeItemsUniq(pointTypes);


  let typesAndIcons = [];
  uniqPointTypes.forEach((element) => {
    eventTypeToEmojiMap.find(function (item) {
      if (item.id === element) {
        typesAndIcons.push(item.icon + ` ` + item.id);
      }
    });
  });


  const valueOfPointType = uniqPointTypes.map((point) => countPointsByType(points, point));

  transportCtx.height = BAR_HEIGHT * uniqPointTypes.length - 1;
  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typesAndIcons,
      datasets: [{
        data: valueOfPointType,
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

  const pointTypes = points.map((point) => point.type.toUpperCase());

  const composePoints = (points) => {
    return points.reduce((info, point, index) => {
      if (!info.type.includes(point.type)) {
        info.type.push(point.type);
        info.sumPrice.push(point.price);
      } else {
        info.sumPrice[info.type.indexOf(point.type)] += point.price;
      }
      return info;
    },
    {
      type: [],
      sumPrice: [],
    }
    );
  };

  const uniqPointTypes = makeItemsUniq(pointTypes);

  let typesAndIcons = [];
  uniqPointTypes.forEach((element) => {
    eventTypeToEmojiMap.find(function (item) {
      if (item.id === element) {
        typesAndIcons.push(item.icon + ` ` + item.id);
      }
    });
  });


  moneyCtx.height = BAR_HEIGHT * uniqPointTypes.length;
  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typesAndIcons,
      datasets: [{
        data: composePoints(points).sumPrice,
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
  const pointTypes = points.map((point) => point.type.toUpperCase());
  const uniqPointTypes = makeItemsUniq(pointTypes);
  const typesAndIcons = [];
  uniqPointTypes.forEach((element) => {
    eventTypeToEmojiMap.find(function (item) {
      if (item.id === element) {
        typesAndIcons.push(item.icon + ` ` + item.id);
      }
    });
  });

  const composePoints = (points) => {
    return points.reduce((info, point, index) => {
      if (!info.type.includes(point.type)) {
        info.type.push(point.type);
        info.durTotalTime.push(
            point.endDate.getTime() - point.startDate.getTime()
        );
      } else {
        info.durTotalTime[info.type.indexOf(point.type)] += (point.endDate.getTime() - point.startDate.getTime());
      }
      return info;
    },
    {
      type: [],
      durTotalTime: [],
    }
    );
  };

  timeCtx.height = BAR_HEIGHT * uniqPointTypes.length;
  const timeChart = new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typesAndIcons,
      datasets: [{
        data: [].slice.call(composePoints(points).durTotalTime.map((date) => msToTime4Stats(date))),
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
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `Time-Spend`,
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
