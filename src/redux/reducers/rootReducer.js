import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import tasksReducer from "./taskReducer";
import commentsReducer from "./commentReducer";
import notificationReducer from "./notificationReducer";
import commonReducer from './commonReducer'

const rootReducer = combineReducers({
  common: commonReducer,
  member: memberReducer,
  tasks: tasksReducer,
  comment: commentsReducer,
  notifications: notificationReducer
  // other reducers
});

export default rootReducer;