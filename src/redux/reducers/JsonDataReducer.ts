import { createReducer } from '@reduxjs/toolkit';
import { setJsonData } from '../actions/JsonDataActions';

const initialState = {
  JsonData: {},
};

// const JsonDataReducer = createReducer(initialState, (builder) => {
//   builder.addCase(setJsonData, (state, action) => {
//     return {...state, JsonData: action.payload,
//     };
//   });
// });

function JsonDataReducer(state = initialState, action:any) {
  switch(action.type) {
    case 'setJsonData':
      return {...state, JsonData: action.payload};
    default:
      return state;
  }
}

export default JsonDataReducer;