import { createReducer } from '@reduxjs/toolkit';
import { setRightPanelData, updateCapabilityDetails,  } from '../actions/RightPanelActions';

const initialState:any = {};

const RightPanelReducer = createReducer(initialState, (builder) => {
  builder.addCase(setRightPanelData, (state, action) => ({
    ...state,
   ...action.payload,
  }));

  builder.addCase(updateCapabilityDetails, (state, action) => ({
    ...state,
   questionsData:{
     ...state.questionsData,
     capabilityDetails:[
       ...action.payload
     ]
   }
  }));

});

export default RightPanelReducer;