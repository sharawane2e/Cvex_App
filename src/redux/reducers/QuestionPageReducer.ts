import { createReducer } from '@reduxjs/toolkit';
import { setAnswerCount } from '../actions/QuestionPageAction';

const initialState: {
  answerCount: any;
} = {
  answerCount: 0,
};

const QuestionPage = createReducer(initialState, (builder) => {
  builder.addCase(setAnswerCount, (state, action) => ({
    ...state,
    answerCount: action.payload,
  }));
});

export default QuestionPage;
