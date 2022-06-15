import { createReducer } from '@reduxjs/toolkit';
import { setLeftPanelData, setLeftPanelOpenClose, updateLeftPanelCategories,  } from '../actions/LeftPanelActions';

interface leftPanel{
  leftPanelOpen:boolean,
  currentScrollPos:string,
  currentSelectedId:string,
  categories:any[]
}

const initialState:leftPanel = {
  leftPanelOpen:false,
  currentScrollPos:"",
  currentSelectedId:"",
  categories:[]
};

const LeftPanelReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLeftPanelData, (state, action) => ({
    ...state,
   ...action.payload,
  }));

  builder.addCase(setLeftPanelOpenClose, (state, action) => ({
    ...state,
    leftPanelOpen:action.payload,
  }));

  builder.addCase(updateLeftPanelCategories, (state, action) => ({
    ...state,
    categories:[...action.payload],
  }));
});


export default LeftPanelReducer;