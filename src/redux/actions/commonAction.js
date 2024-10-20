
// actions.js
import { TOGGLE_ACTIVITY_POPUP, TOGGLE_NOTIFICATION_POPUP, SETTINGS_POPUP, COMMENT_POPUP, ACTIVITY_CHANGE_POPUP } from '../actionTypes';

export const toggleActivityPopUp = () => ({
  type: TOGGLE_ACTIVITY_POPUP,
});

export const toggleNotificationPopUp = () => ({
  type: TOGGLE_NOTIFICATION_POPUP,
});

export const settingsPopUp = () => ({
  type: SETTINGS_POPUP,
});

export const commentsPopUp = () => ({
  type: COMMENT_POPUP,
});

export const activityChangePopUp = () => ({
  type: ACTIVITY_CHANGE_POPUP,
});

