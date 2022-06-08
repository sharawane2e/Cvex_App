import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import QuestionPage from "./QuestionPageReducer";
import sidebarReducer from "./SidebarReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"],
};

const rootReducer = combineReducers({
    question:QuestionPage,
    sidebar:sidebarReducer,
////   questions: questionReducer,
//   filters: filterReducer,
//   chart: chartReducer,
//   tour: tourReducer,
//   sidebar: sidebarReducer,
  //question: persistReducer(persistConfig, QuestionPage),
});

export default rootReducer;