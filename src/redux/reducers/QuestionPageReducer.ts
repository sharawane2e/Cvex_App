import { createReducer } from '@reduxjs/toolkit';
import { setProgressBar } from '../actions/ProgressBarAction';

const initialState: {
  progressBar: any;
} = {
  progressBar: '',
};

const QuestionPage = createReducer(initialState, (builder) => {
  builder.addCase(setProgressBar, (state, action) => ({
    ...state,
    progressBar: action.payload,
  }));
});

export default QuestionPage;
