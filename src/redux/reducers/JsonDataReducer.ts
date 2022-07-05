import { createReducer } from '@reduxjs/toolkit';
import { setJsonData } from '../actions/JsonDataActions';

const initialState = {
  JsonData: true,
};

const JsonDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(setJsonData, (state, action) => {
    return {...state, JsonData: action.payload,
    };
  });
});

export default JsonDataReducer;