import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import tasksReducer from "./taskReducer";
import commentsReducer from "./commentReducer";
import notificationReducer from "./notificationReducer";
import popupReducer from './commonReducer';
import profileReducer from "./settingsReducer";

const rootReducer = combineReducers({
  common: popupReducer,
  member: memberReducer,
  profileDetails: profileReducer,
  tasks: tasksReducer,
  comment: commentsReducer,
  notifications: notificationReducer
  // other reducers
});

export default rootReducer;