import { createReducer } from '@reduxjs/toolkit';
import { setJsonData, setNewData } from '../actions/JsonDataActions';

const initialState = {
  JsonData: {},
};

// const JsonDataReducer = createReducer(initialState, (builder) => {
//   builder.addCase(setJsonData, (state, action) => {
//     return {...state, JsonData: action.payload,
//     };
//   });
// });

// function JsonDataReducer(state = initialState, action:any) {
//   switch(action.type) {
//     case 'setJsonData':
//       return {...state, JsonData: action.payload};
//     default:
//       return state;
//   }
// }

const JsonDataReducer = createReducer(initialState, (builder) => {
  builder.addCase(setNewData, (state, action) => ({
    ...state,
    ...action.payload,
  }))});

export default JsonDataReducer;