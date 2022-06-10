import { createReducer } from '@reduxjs/toolkit';
import { setAnswerCount } from '../actions/ProgressBarAction';

const initialState: {
  answerCount: any;
} = {
  answerCount: 0,
};

const ProgressBarReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAnswerCount, (state, action) => ({
    ...state,
    answerCount: action.payload,
  }));
});

export default ProgressBarReducer;
