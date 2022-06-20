import { createReducer } from '@reduxjs/toolkit';
import { setSideBar } from '../actions/SideBarAction';

const initialState = {
  sidebartoggle: true,
};

const SidebarReducer = createReducer(initialState, (builder) => {
  // builder.addCase(setSideBar, (state, action) => ({
  //   return {
  //   ...state,
  //   sidebartoggle: action.payload,
  //   }
  // }));
  builder.addCase(setSideBar, (state, action) => {
    return {
      ...state,
      sidebartoggle:
        action.payload === undefined ? !state.sidebartoggle : !!action.payload,
    };
  });
});

export default SidebarReducer;