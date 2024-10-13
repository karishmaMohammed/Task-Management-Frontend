import React, { useState } from "react";
import "./HomePage.css";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotifications } from "../../redux/actions/notificationsAction"; // Import action creators
import { usePopup } from "../../helpers/PopUpHelper";
import SettingsPopUp from "../Settings/SettingsPopUp";

function LoggedInNavPage() {
  const {
    isNotificationPopUpOpen,
    handleNotificationPopUpToggle,
    isSettingPopUpOpen,
    handleSettingPopUpToggle,
  } = usePopup();

  const dispatch = useDispatch();
  const { activePage } = useSelector((state) => state.notifications);

  const getNotifications = () => {
    dispatch(fetchAllNotifications(activePage));
  };

  // const [openNotiofications, setOpenNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState("");
  const handleMakeZero = () => {
    setNotificationCount(0);
  };
  return (
    <>
      <div className="top-nav">
        <div className="user-icons">
          {/* <img
            onClick={() => setOpenNotifications(!openNotiofications)}
            src="https://cdn-icons-png.freepik.com/256/5794/5794042.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid"
            alt=""
          /> */}
          <img
            onClick={() => {
              handleNotificationPopUpToggle();
              getNotifications();
            }}
            src="https://cdn-icons-png.freepik.com/256/1156/1156949.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
            alt="notification"
          />
          <img
            onClick={handleSettingPopUpToggle}
            src="https://icon-library.com/images/username-icon-png/username-icon-png-19.jpg"
            alt=""
          />

          {/* FEMALE USER LOGO AFTER LOGIN 
 https://cdn-icons-png.freepik.com/256/3984/3984678.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid

*/}

          {/* MALE USER LOGO AFTER LOGIN
https://cdn-icons-png.freepik.com/256/11044/11044904.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid
*/}
          {/* <button>Signup</button>
                <button>Login</button> */}
        </div>
      </div>
      {isNotificationPopUpOpen && <Notification />}
      {isSettingPopUpOpen && (
        <SettingsPopUp
          memberPhoto=""
          memberName="karishma"
          memberEmail="mohammed"
        />
      )}
    </>
  );
}

export default LoggedInNavPage;
