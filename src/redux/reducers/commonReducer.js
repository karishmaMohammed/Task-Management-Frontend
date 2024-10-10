// popupReducer.js
import { TOGGLE_ACTIVITY_POPUP, TOGGLE_NOTIFICATION_POPUP, SETTINGS_POPUP } from '../actionTypes';


const initialState = {
  isActivityPopUpOpen: false,
  isNotificationPopUpOpen: false,
  isSettingPopUpOpen : false,
};

const popupReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVITY_POPUP:
      return {
        ...state,
        isActivityPopUpOpen: !state.isActivityPopUpOpen,  // Toggle the current state
      };
      case TOGGLE_NOTIFICATION_POPUP:
        return {
          ...state,
          isNotificationPopUpOpen: !state.isNotificationPopUpOpen,
        }
        case SETTINGS_POPUP:
          return{
            ...state,
            isSettingPopUpOpen: !state.isSettingPopUpOpen,
          }
    default:
      return state;
  }
};

export default popupReducer;
