import { createReducer } from "@reduxjs/toolkit";
import {
  setDropDown,
  setSecDropDown,
} from "../actions/HighChartDropDownAction";

const initialState: {
  selectedData: any;
  selectSecondDropDown: any;
} = {
  selectedData: "",
  selectSecondDropDown: "",
};

const ProgressBarReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDropDown, (state, action) => ({
    ...state,
    selectedData: action.payload,
  }));
  builder.addCase(setSecDropDown, (state, action) => ({
    ...state,
    selectSecondDropDown: action.payload,
  }));
});

export default ProgressBarReducer;
