import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import tasksReducer from "./taskReducer";
import commentsReducer from "./commentReducer";
import popupReducer from './commonReducer';
import profileReducer from "./settingsReducer";

const rootReducer = combineReducers({
  common: popupReducer,
  member: memberReducer,
  profileDetails: profileReducer,
  tasks: tasksReducer,
  comment: commentsReducer,
 
  // other reducers
});

export default rootReducer;