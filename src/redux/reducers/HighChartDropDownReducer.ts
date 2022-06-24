import { createReducer } from "@reduxjs/toolkit";
import { setDropDown } from "../actions/HighChartDropDownAction";

const initialState: {
  selectedData: any;
} = {
  selectedData: "",
};

const ProgressBarReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDropDown, (state, action) => ({
    ...state,
    selectedData: action.payload,
  }));
});

export default ProgressBarReducer;
