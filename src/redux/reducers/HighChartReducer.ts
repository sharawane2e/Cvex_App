import { createReducer } from "@reduxjs/toolkit";
import {
  setBarChartOptions,
  setBaseLineChartOptions,
  setPotentialChartOptions,
  setSegmentChartOptions,
} from "../actions/HighChartAction";

export interface IChartState {
  barChartOptions: any;
  baseLineChartOptions: any;
  potentialChartOptions: any;
  segmentChartOptions: any;
}

export const defaultPlotOptions = {
  series: {
    stacking: "normal",
  },
  dataLabels: {
    formatter: function (y: any) {
      return Math.abs(y) + "€";
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

const initialState: IChartState = {
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
      categories: ["Baseline", "Possible future baseline"],
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
        data: [],
        dataLabels: {
          enabled: true,
          color: "black",
          inside: false,
          x: 0,
          align: "left",
          format: "{point.y:,.2f}€",
        },
        legendIndex: 0,
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
      pointFormat: "<b>€{point.y:,.2f}</b>",
    },
    series: [
      {
        data: [],
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
      pointFormat: "<b>€{point.y:,.2f}</b>",
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
    barChartOptions: {
      ...state.barChartOptions,
      series: [
        {
          data: [...action.payload],
        },
      ],
    },
  }));
  builder.addCase(setBaseLineChartOptions, (state, action) => ({
    ...state,
    baseLineChartOptions: {
      ...state.baseLineChartOptions,
      xAxis: {
        ...action.payload,
      },
      series: [
        {
          ...action.payload,
        },
      ],
    },
  }));
  builder.addCase(setPotentialChartOptions, (state, action) => ({
    ...state,
    potentialChartOptions: {
      ...state.potentialChartOptions,
      series: [
        {
          data: [...action.payload],
        },
      ],
    },
  }));
  builder.addCase(setSegmentChartOptions, (state, action) => ({
    ...state,
    segmentChartOptions: {
      ...state.segmentChartOptions,
      series: [
        {
          data: [...action.payload],
        },
      ],
    },
  }));
});

export default HighChartReducer;
