import { createReducer } from "@reduxjs/toolkit";
import { setHighChartOptions } from "../actions/HighChartAction";

const initialState = {};

const HighChartReducer = createReducer(initialState, (builder) => {
  builder.addCase(setHighChartOptions, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});

export default HighChartReducer;
