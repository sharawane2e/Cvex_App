import { createAction } from "@reduxjs/toolkit";

export const setBarChartOptions = createAction<any>("SET_BAR_CHART_OPTIONS");
export const setBaseLineChartOptions = createAction<any>(
  "SET_BASELINE_CHART_OPTIONS"
);
export const setPotentialChartOptions = createAction<any>(
  "SET_POTENTIAL_CHART_OPTIONS"
);
export const setSegmentChartOptions = createAction<any>(
  "SET_SEGMENT_CHART_OPTIONS"
);

export const setCharcategory = createAction<any>("SET_BAR_CATEGORY");

export const setCharBasetTitle = createAction<any>("SET_BASE_TITLE");

export const setCharPotentialtTitle = createAction<any>("SET_POTENTIAL_TITLE");
