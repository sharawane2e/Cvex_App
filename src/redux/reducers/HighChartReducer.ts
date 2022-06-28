import { createReducer } from "@reduxjs/toolkit";
import { getSymbolFormat } from "../../utils";

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

export const defaultXFontSize={style: { fontSize:"16px"}};
export const defaultYFontSize={style: { fontSize:"16px",fontWeight:"bold"}};
export const defaultYAxis = {
  tickLength: 0,
  labels: {
    enabled: false,
    ...defaultYFontSize,
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
export const defaultYDataLabels = {
  enabled: true,
          color: "black",
          inside: false,
          // y: 50,
          align: "center",
          // format: "{point.y:,.2f}",
          formatter: function (this: any) {
            return Math.abs(this.y) + "€";}
};
export const defaultXDataLabels = {
  enabled: true,
          color: "black",
          inside: false,
          x: 50,
          align: "center",
          // format: "{point.y:,.2f}",
          formatter: function (this: any) {
            return Math.abs(this.y) + "€";}
};

export const defaultMargin={marginTop: 40};


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
      labels:{
        ...defaultXFontSize
      }
    },
    yAxis: {
      ...defaultYAxis,
      ...defaultXFontSize
    },

    plotOptions: {
      defaultPlotOptions,
    },
    legend: {
      enabled: false,
      // backgroundColor: "red",
    },
    series: [
      {
        data: [],
        dataLabels: {
          ...defaultXDataLabels
        },
        legendIndex: 0,
      },
    ],
  },
  baseLineChartOptions: {
    chart: {
      type: "waterfall",
      ...defaultMargin
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
      labels:{
        ...defaultXFontSize
      }
    },
    yAxis: {
      ...defaultYAxis,
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
        dataLabels: {
         ...defaultYDataLabels
        },
      },
    ],
  },
  potentialChartOptions: {
    chart: {
      type: "waterfall",
      ...defaultMargin
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
      labels:{
        ...defaultXFontSize
      }
      // categories: ["asd", "asd"], gridLineWidth: 0
    },
    yAxis: {
      ...defaultYAxis,
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
        dataLabels: {
         ...defaultYDataLabels
        },
      },
    ],
  },
  segmentChartOptions: {
    chart: {
      type: "waterfall",
      ...defaultMargin
    },
    title: "",
    xAxis: {
      tickLength: 0,
      type: "category",
      gridLineWidth: 0,
      labels:{
        ...defaultXFontSize
      }
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
      pointFormat: "<b>€{point.y:,.2f}</b>"
    },
    series: [
      {
        data: [],
        dataLabels: {
          ...defaultYDataLabels
        },
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
  builder.addCase(setSegmentChartOptions, (state, action) => ({
    ...state,
    segmentChartOptions: {
      ...state.segmentChartOptions,
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
});

export default HighChartReducer;
