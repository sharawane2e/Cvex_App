import { createReducer } from "@reduxjs/toolkit";
import {
    setProgressBar
} from "../actions/QuestionPageAction";

const initialState: {
  progressBar: any;

} = {
    progressBar: "",
};

const filterReducer = createReducer(initialState, (builder) => {
  builder.addCase(setProgressBar, (state, action) => ({
    ...state,
    progressBar: action.payload,
  }));

 
});

export default filterReducer;