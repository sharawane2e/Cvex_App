import { createReducer } from '@reduxjs/toolkit';
import { setAnswerCount } from '../actions/QuestionPageAction';

const initialState: {
  progressBar: any;
} = {
  progressBar: 0,
};

const QuestionPage = createReducer(initialState, (builder) => {
  builder.addCase(setAnswerCount, (state, action) => ({
    ...state,
    progressBar: action.payload,
  }));
});

export default QuestionPage;
