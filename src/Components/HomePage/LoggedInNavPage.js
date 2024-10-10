import React, { useState } from "react";
import "./HomePage.css";
import Notification from "../Notification/Notification";
import Settings from "../Settings/Settings";

function LoggedInNavPage() {
  const [openNotiofications, setOpenNotifications] = useState(false);
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
            onClick={() => setOpenNotifications(!openNotiofications)}
            src="https://cdn-icons-png.freepik.com/256/1156/1156949.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
            alt="notification"
          />
          <img
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
      {openNotiofications && (
        <Notification
          onclose={() => setOpenNotifications(!openNotiofications)}
          handleMakeZero={handleMakeZero}
        />
      )}
      <Settings memberPhoto= '' memberName ='karishma' memberEmail='mohammed'onClose={false}/>
    </>
  );
}

export default LoggedInNavPage;
