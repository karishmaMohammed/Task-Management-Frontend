import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    GET_COMMENT_REQUEST,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
  } from '../actionTypes';
  
  const initialState = {
    loading: false,
    comments: [],
    error: null,
    success: false
  };
  
  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT_REQUEST:
      case GET_COMMENT_REQUEST:
      case DELETE_COMMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: [...state.comments, action.payload], // Add new comment to the list
          success: action.payload,
        };
      case GET_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: action.payload, // Set comments from the API
        };
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.filter(comment => comment.id !== action.payload.id), // Remove deleted comment
        };
      case CREATE_COMMENT_FAILURE:
      case GET_COMMENT_FAILURE:
      case DELETE_COMMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Set error message
        };
      default:
        return state;
    }
  };
  
  export default commentsReducer;
  