import { createReducer } from '@reduxjs/toolkit';
import {
  setBarChartOptions,
  setBaseLineChartOptions,
  setPotentialChartOptions,
  setSegmentChartOptions,
  setCharBasetTitle,
  setCharPotentialtTitle,
  setCharcategory,
  setTooltip,
} from '../actions/HighChartAction';

export interface IChartState {
  barChartOptions: any;
  baseLineChartOptions: any;
  potentialChartOptions: any;
  segmentChartOptions: any;
}

export const defaultPlotOptions = {
  bar: {
    groupPadding: 0,
    pointPadding: 0,
    pointWidth: 40,
    dataLabels: {
      enabled: true,
      style: {
        textShadow: false,
        textOutline: false,
        fontWeight: 'normal',
      },
    },
  },
};

export const defaultXFontSize = {
  style: { fontSize: '12px', fontWeight: 'normal', color: '#000000' },
};
export const defaultYFontSize = {
  style: { fontSize: '12px', fontWeight: 'normal' },
};
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
      color: '#000000',
      value: 0,
      zIndex: 5,
    },
  ],
};

export const defaultMarginTop = { marginTop: 40 };
export const defaultMarginRight = { marginRight: 100 };

const initialState: IChartState = {
  barChartOptions: {
    chart: {
      type: 'bar',
      ...defaultMarginRight,
      height: 150,
    },
    title: {
      text: '',
    },
    xAxis: {
      tickLength: 0,
      gridLineWidth: 0,
      categories: [],
      labels: {
        y: 0,
        style: {
          color: '#2A2A2A',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      x: 0,
      visible: false,
      reversedStacks: false,
    },
    tooltip: {
      //pointFormat: '<b>{point.y:,.0f} €</b>',
      pointFormat: '<b>{point.y:,.0f} €</b>',
      // formatter: function (this: any) {
      //   return this.points.reduce(function (s: any, point: any) {
      //     return s + '<br/>' + point.series.name + ': ' + point.y + 'm';
      //   }, '<b>' + this.x + '</b>');
      // },
    },
    plotOptions: {
      ...defaultPlotOptions,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        data: [],
        legendIndex: 0,
      },
    ],
  },
  baseLineChartOptions: {
    chart: {
      type: 'waterfall',
      ...defaultMarginTop,
    },
    title: {
      text: '',
      useHTML: true,
      style: {
        color: '#fff',
        'background-color': '#ccc',
        fontWeight: 'bold',
        'text-transform': 'uppercase',
      },
    },
    xAxis: {
      tickLength: 0,
      categories: '',
      gridLineWidth: 0,
      labels: {
        ...defaultXFontSize,
      },
    },
    yAxis: {
      ...defaultYAxis,
    },
    plotOptions: {
      ...defaultPlotOptions,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      formatter: function (this: any) {
        return this.x + '<br/>' + `<b>${Math.abs(this.y)} €</b>`;
      },
      //  pointFormat: '<b>{point.y:,.0f} €</b>',
    },
    series: [
      {
        data: [],
      },
    ],
  },
  potentialChartOptions: {
    chart: {
      type: 'waterfall',
      ...defaultMarginTop,
    },
    title: {
      text: '',
      useHTML: true,
      style: {
        color: '#fff',
        'background-color': '#027AB1',
        fontWeight: 'bold',
        'text-transform': 'uppercase',
      },
    },
    xAxis: {
      tickLength: 0,
      type: 'category',
      gridLineWidth: 0,
      labels: {
        ...defaultXFontSize,
      },
    },
    yAxis: {
      ...defaultYAxis,
    },

    legend: {
      enabled: false,
    },
    tooltip: {
      // pointFormat: '<b>€{point.y:,.0f}</b>',
      formatter: function (this: any) {
        return this.x + '<br/>' + `<b>${Math.abs(this.y)} €</b>`;
      },
    },
    series: [
      {
        data: [],
      },
    ],
  },
  segmentChartOptions: {
    chart: {
      type: 'waterfall',
      ...defaultMarginTop,
    },
    title: '',
    xAxis: {
      tickLength: 0,
      type: 'category',
      gridLineWidth: 0,
      labels: {
        ...defaultXFontSize,
      },
    },
    yAxis: {
      tickInterval: 0,
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: '',
    },
    legend: {
      enabled: false,
    },

    tooltip: {
      formatter: function (this: any) {
        return this.x + '<br/>' + `<b>${Math.abs(this.y)}</b>`;
      },
      // pointFormat: '<b>{point.y:,.0f} €</b>',
    },
    series: [
      {
        data: [],
      },
    ],
  },
};

const HighChartReducer = createReducer(initialState, (builder) => {
  builder.addCase(setTooltip, (state, action) => {
    return {
      ...state,
      barChartOptions: {
        ...state.barChartOptions,
        tooltip: {
          // pointFormat: ...state.barChartOptions.tooltip.pointFormat,
          ...action.payload,
          // ...state.barChartOptions.tooltip,
        },
      },
    };
  });
  builder.addCase(setBarChartOptions, (state, action) => ({
    ...state,
    barChartOptions: {
      ...state.barChartOptions,
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
  builder.addCase(setCharBasetTitle, (state, action) => {
    return {
      ...state,
      baseLineChartOptions: {
        ...state.baseLineChartOptions,
        title: {
          text: action.payload,
        },
      },
    };
  });
  builder.addCase(setCharPotentialtTitle, (state, action) => {
    return {
      ...state,
      potentialChartOptions: {
        ...state.potentialChartOptions,
        title: {
          text: action.payload,
        },
      },
    };
  });
  builder.addCase(setCharcategory, (state, action) => {
    return {
      ...state,
      barChartOptions: {
        ...state.barChartOptions,
        xAxis: {
          categories: [...action.payload],
        },
      },
    };
  });
});

export default HighChartReducer;
