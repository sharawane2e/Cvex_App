import { createAction } from '@reduxjs/toolkit';

export const setBarChartOptions = createAction<any>('SET_BAR_CHART_OPTIONS');
export const setBaseLineChartOptions = createAction<any>(
  'SET_BASELINE_CHART_OPTIONS',
);
export const setPotentialChartOptions = createAction<any>(
  'SET_POTENTIAL_CHART_OPTIONS',
);
export const setSegmentChartOptions = createAction<any>(
  'SET_SEGMENT_CHART_OPTIONS',
);
export const setChartSymbol = createAction<any>('SET_SYMBOL_CHART');
