// popupHelper.js
import { useSelector, useDispatch } from "react-redux";
import {
  toggleActivityPopUp,
  toggleNotificationPopUp,
  settingsPopUp,
  commentsPopUp,
  activityChangePopUp
} from "../redux/actions/commonAction"; // Import your toggle action

// Helper function to manage popup state and toggling
export const usePopup = () => {
  // Retrieve the current popup state
  const isActivityPopUpOpen = useSelector(
    (state) => state.common.isActivityPopUpOpen
  );
  const isNotificationPopUpOpen = useSelector(
    (state) => state.common.isNotificationPopUpOpen
  );
  const isSettingPopUpOpen = useSelector(
    (state) => state.common.isSettingPopUpOpen
  );

  const isCommentPopUpOpen = useSelector(
    (state)=> state.common.isCommentPopUpOpen
  )

  const isActivityChangePopUpOpen = useSelector(
    (state)=> state.common.isActivityChangePopUpOpen
  )
  // Dispatch to toggle the popup state
  const dispatch = useDispatch();

  const handleActivityPopUpToggle = () => {
    dispatch(toggleActivityPopUp());
  };

  const handleNotificationPopUpToggle = () => {
    dispatch(toggleNotificationPopUp());
  };

  const handleSettingPopUpToggle = () => {
    dispatch(settingsPopUp());
  };

  const handleCommentPopUpToggle = () => {
    dispatch(commentsPopUp());
  };

  const handleActivityChangePopUpToggle = () => {
    dispatch(activityChangePopUp());
  };

  // Return the state and the toggle function
  return {
    isActivityPopUpOpen,
    isNotificationPopUpOpen,
    isSettingPopUpOpen,
    isCommentPopUpOpen,
    isActivityChangePopUpOpen,
    handleActivityPopUpToggle,
    handleNotificationPopUpToggle,
    handleSettingPopUpToggle,
    handleCommentPopUpToggle,
    handleActivityChangePopUpToggle
  };
};
