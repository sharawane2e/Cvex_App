import { combineReducers } from "redux";
import RightPanelReducer from "./RightPanelReducer";
import LeftPanelReducer from "./LeftPanelReducer";
import HighChartReducer from "./HighChartReducer";

const rootReducer = combineReducers({
  leftPanel: LeftPanelReducer,
  rightPanel: RightPanelReducer,
  chart: HighChartReducer,
});

export default rootReducer;
