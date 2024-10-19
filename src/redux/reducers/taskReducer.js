import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  FETCH_TASK_DETAILS_REQUEST,
  FETCH_TASK_DETAILS_SUCCESS,
  FETCH_TASK_DETAILS_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  // other action types...
} from '../actionTypes';

const initialState = {
  loading: false,
  taskList: [],
  taskDetails: {}, // Added for task details
  error: '',
  message:''
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: action.payload,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: [...state.taskList, action.payload], // Add the new task to the list
        error: '',
      };
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TASK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        taskDetails: null, // Clear task details when fetching starts
      };
    case FETCH_TASK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskDetails: action.payload, // Store the fetched task details
      };
    case FETCH_TASK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
