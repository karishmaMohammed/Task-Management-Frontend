import React, { useState, useRef, useEffect } from "react";
import "./HomePage.css";
import Notification from "../Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemberDetails } from "../../redux/actions/memberAction";
// import { fetchAllNotifications } from "../../redux/actions/notificationsAction"; // Import action creators
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
  const hasFetched = useRef(false);
  const femaleIconUrl =
    "https://cdn-icons-png.freepik.com/256/3984/3984678.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid";
  const maleIconUrl =
    "https://cdn-icons-png.freepik.com/256/11044/11044904.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid";

  // const { activePage } = useSelector((state) => state.notifications);

  // const getNotifications = () => {
  //   dispatch(fetchAllNotifications(activePage));
  // };

  // const [openNotiofications, setOpenNotifications] = useState(false);
  // const [notificationCount, setNotificationCount] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("user_task_token");

    if (token && !hasFetched.current) {
      dispatch(fetchMemberDetails());
      hasFetched.current = true; // Set to true after first dispatch
    }
  }, [dispatch]);

  const user = useSelector((state) => state.member.member_details);
 
  const notificationCount = useSelector(
    (state) => state.member.notification_count
  );

  // const handleMakeZero = () => {
  //   setNotificationCount(0);
  // };
  return (
    <>
      <div className="top-nav">
        <div className="user-icons">
          {/* <img
            onClick={() => setOpenNotifications(!openNotiofications)}
            src="https://cdn-icons-png.freepik.com/256/5794/5794042.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid"
            alt=""
          /> */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              onClick={() => {
                handleNotificationPopUpToggle();
              }}
              src="https://cdn-icons-png.freepik.com/256/1156/1156949.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
              alt="notification"
              style={{ width: "24px", height: "24px" }}
            />
            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "3px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {notificationCount}
              </span>
            )}
          </div>
          <img
             onClick={handleSettingPopUpToggle}
            src={user.gender === "female" ? femaleIconUrl : maleIconUrl}
            alt="User Profile"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
         
        </div>
      </div>
      {isNotificationPopUpOpen && <Notification />}
      {isSettingPopUpOpen && (
        <SettingsPopUp
          memberPhoto={user.gender === "female" ? femaleIconUrl : maleIconUrl}
          memberName= { user.full_name}
          memberEmail={ user.email}
        />
      )}
    </>
  );
}

export default LoggedInNavPage;
