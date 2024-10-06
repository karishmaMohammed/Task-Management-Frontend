import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  // Add other reducers here if necessary
});

export default rootReducer;
