// popupReducer.js
import { OPEN_POPUP, CLOSE_POPUP } from '../actionTypes';

const initialState = {
  isPopupOpen: false,
};

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP:
      return {
        ...state,
        isPopupOpen: true,
      };
    case CLOSE_POPUP:
      return {
        ...state,
        isPopupOpen: false,
      };
    default:
      return state;
  }
};

export default popupReducer;
