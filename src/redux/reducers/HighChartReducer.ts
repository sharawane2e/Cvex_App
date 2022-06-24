import { createReducer } from "@reduxjs/toolkit";
import {
  setBarChartOptions,
  setBaseLineChartOptions,
  setPotentialChartOptions,
  setSegmentChartOptions,
} from "../actions/HighChartAction";

export const defaultPlotOptions = {
  series: {
    stacking: "normal",
  },
  dataLabels: {
    formatter: function (y: any) {
      return Math.abs(y) + "%";
    },
  },
};

export const defaultyAxis = {
  tickLength: 0,
  labels: {
    enabled: false,
  },
  gridLineWidth: 0,
  title: false,
  plotLines: [
    {
      color: "#000000",
      value: 0,
      zIndex: 5,
    },
  ],
};

const initialState = {
  barChartOptions: {
    chart: {
      type: "bar",
    },
    title: {
      text: "",
    },
    xAxis: {
      tickLength: 0,
      gridLineWidth: 0,
      categories: ["asd", "asd"],
    },
    yAxis: {
      ...defaultyAxis,
    },

    plotOptions: {
      defaultPlotOptions,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: [100, 100],
      },
    ],
  },
  baseLineChartOptions: {
    chart: {
      type: "waterfall",
    },
    title: {
      text: "BASELINE",
      useHTML: true,
      style: {
        color: "#fff",
        "background-color": "#ccc",
        fontWeight: "bold",
      },
    },
    xAxis: {
      tickLength: 0,
      categories: "",
      gridLineWidth: 0,
      // categories: ["asd", "asd"], gridLineWidth: 0
    },
    yAxis: {
      ...defaultyAxis,
    },

    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "<b>${point.y:,.2f}</b> USD",
    },
    series: [
      {
        data: [
          {
            name: "Start",
            y: 0,
          },
          {
            name: "Product Revenue",
            y: 9523,
          },
        ],
      },
    ],
  },
  potentialChartOptions: {
    chart: {
      type: "waterfall",
    },
    title: {
      text: "POTENTIAL FUTURE BASELINE",
      useHTML: true,
      style: {
        color: "#fff",
        "background-color": "#027AB1",
        fontWeight: "bold",
      },
    },
    xAxis: {
      tickLength: 0,
      type: "category",
      gridLineWidth: 0,
      // categories: ["asd", "asd"], gridLineWidth: 0
    },
    yAxis: {
      ...defaultyAxis,
    },

    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "<b>${point.y:,.2f}</b> USD",
    },
    series: [
      {
        data: [
          {
            name: "Start",
            y: 0,
          },
          {
            name: "Product Revenue",
            y: 9523,
          },
        ],
      },
    ],
  },
  segmentChartOptions: {
    chart: {
      type: "waterfall",
    },
    title: "",
    xAxis: {
      tickLength: 0,
      type: "category",
      gridLineWidth: 0,
      // categories: ["asd", "asd"], gridLineWidth: 0
    },
    yAxis: {
      tickInterval: 0,
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: "",
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "<b>${point.y:,.2f}</b> USD",
    },
    series: [
      {
        data: [
          {
            name: "Start",
            y: 0,
          },
          {
            name: "Product Revenue",
            y: 9523,
          },
        ],
      },
    ],
  },
};

const HighChartReducer = createReducer(initialState, (builder) => {
  builder.addCase(setBarChartOptions, (state, action) => ({
    ...state,
    chartOptions: {
      ...state.barChartOptions,
      chart: {
        ...state.barChartOptions.chart,
      },
    },
  }));
  builder.addCase(setBaseLineChartOptions, (state, action) => ({
    ...state,
    chartOptions: {
      ...state.baseLineChartOptions,
      chart: {
        ...state.baseLineChartOptions.chart,
      },
    },
  }));
  builder.addCase(setPotentialChartOptions, (state, action) => ({
    ...state,
    chartOptions: {
      ...state.potentialChartOptions,
      chart: {
        ...state.potentialChartOptions.chart,
      },
    },
  }));
  builder.addCase(setSegmentChartOptions, (state, action) => ({
    ...state,
    chartOptions: {
      ...state.segmentChartOptions,
      chart: {
        ...state.segmentChartOptions.chart,
      },
    },
  }));
});

export default HighChartReducer;
