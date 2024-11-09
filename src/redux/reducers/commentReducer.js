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
    commentLoading: false,
    comments: [],
    commentError: null,
    success: false,
    done: false,
  };
  
  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT_REQUEST:
      case GET_COMMENT_REQUEST:
      case DELETE_COMMENT_REQUEST:
        return {
          ...state,
          commentLoading: true,
          commentError: null,
        };
      case CREATE_COMMENT_SUCCESS:
        return {
          ...state,
          commentLoading: false,
          done:true,
          comments: [...state.comments, action.payload], // Add new comment to the list
          success: action.payload,
         
        };
      case GET_COMMENT_SUCCESS:
        return {
          ...state,
          commentLoading: false,
          comments: action.payload, // Set comments from the API
        };
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          commentLoading: false,
          done:true,
          comments: state.comments.filter(comment => comment.id !== action.payload.id),
          success: true,
        };
      case CREATE_COMMENT_FAILURE:
      case GET_COMMENT_FAILURE:
      case DELETE_COMMENT_FAILURE:
        return {
          ...state,
          commentLoading: false,
          commentError: action.payload, // Set commentError message
        };
      default:
        return state;
    }
  };
  
  export default commentsReducer;
  