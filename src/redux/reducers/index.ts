import { combineReducers } from "redux";
import RightPanelReducer from "./RightPanelReducer";
import LeftPanelReducer from "./LeftPanelReducer";
import HighChartReducer from "./HighChartReducer";
import HighChartDropDownReducer from "./HighChartDropDownReducer";

const rootReducer = combineReducers({
  leftPanel: LeftPanelReducer,
  rightPanel: RightPanelReducer,
  chart: HighChartReducer,
  dropdown: HighChartDropDownReducer,
});

export default rootReducer;
