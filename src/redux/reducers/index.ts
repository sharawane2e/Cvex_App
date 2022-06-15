import { combineReducers } from 'redux';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import ProgressBarReducer from './ProgressBarReducer';
// import SidebarReducer from './SidebarReducer';
// import QuestionPageReducer from './QuestionPageReducer';
import RightPanelReducer from './RightPanelReducer';
import LeftPanelReducer from './LeftPanelReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['profile'],
// };

const rootReducer = combineReducers({
  leftPanel:LeftPanelReducer,
  rightPanel:RightPanelReducer,
});

export default rootReducer;
