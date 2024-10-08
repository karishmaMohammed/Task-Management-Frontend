// reducers/taskReducer.js
import {
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAILURE,
    // other action types
  } from '../actionTypes';
  
  const initialState = {
    loading: false,
    tasks: [],
    error: '',
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_TASK_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: [...state.tasks, action.payload], // Add the newly created task
          error: '',
        };
      case CREATE_TASK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Set error message
        };
      // Handle other actions...
      default:
        return state;
    }
  };
  
  export default taskReducer;
  