import { createReducer } from '@reduxjs/toolkit';
import { setPageJson } from '../actions/JsonDataActions';

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
  builder.addCase(setPageJson, (state, action) => ({...state, JsonData : action.payload}))
});

export default JsonDataReducer;