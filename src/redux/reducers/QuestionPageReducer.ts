import { createReducer } from '@reduxjs/toolkit';
import {setQuestionPageData} from "../actions/QuestionPageAction"

const initialState = {};

const QuestionPageReducer = createReducer(initialState, (builder) => {
  builder.addCase(setQuestionPageData, (state, action) => ({
    ...state,
   ...action.payload,
  }));
});

export default QuestionPageReducer;