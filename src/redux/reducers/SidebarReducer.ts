import { createReducer } from "@reduxjs/toolkit";
import {
    setSideBar
} from "../actions/SideBarAction";

const initialState: {
  sidebartoggle: boolean;

} = {
  sidebartoggle: false,
};

const filterReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSideBar, (state, action) => ({
    ...state,
    sidebartoggle: action.payload ,
  }));

 
});

export default filterReducer;