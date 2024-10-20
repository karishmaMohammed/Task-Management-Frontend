import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant";
import CloseIcon from "@mui/icons-material/Close";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePopup } from "../../helpers/PopUpHelper";
import "./Notification.css";

function Notification() {
  const [activeElement, setActiveElement] = useState("notif-all");
  const [unReadNotification, setUnReadNotifications] = useState([]);
  const [allNotification, setAllNotifications] = useState([]);
  const [allUnreadNotification, setAllUnReadNotifications] = useState(0);
  const [allNotificationCount, setAllNotificationsCount] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const { isNotificationPopUpOpen, handleNotificationPopUpToggle } = usePopup();
  
  const nav = useNavigate();
  const containerRef = useRef(null);

  
  const handleClose = () => {
    handleNotificationPopUpToggle();
  };

  const LIMIT = 20;
  const getReadNotifications = async () => {
    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };

      const response = await axios.get(
        `${BASE_URL}/notification/get-notifications`,
        {
          params: {
            page: activePage,
            size: LIMIT,
          },
          headers: headers,
        }
      );

      setAllNotifications((prevNotifications) => [
        ...prevNotifications,
        ...response.data.data.all_notification,
      ]);
      setAllNotificationsCount(response.data.data.all_count);

      setUnReadNotifications((prevNotifications) => [
        ...prevNotifications,
        ...response.data.data.un_read_notification,
      ]);
      setAllUnReadNotifications(response.data.data.un_read_count);
      // console.log(response.data.data.un_read_notification);
      // const notificationsToDisplay = activeElement === 'notif-unread' ? unReadNotification : allNotification;

      setActivePage(activePage + 1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReadNotifications();
  }, []);

  const notificationsToDisplay =
    activeElement === "notif-unread" ? unReadNotification : allNotification;
 
  const notificationsCount =
    activeElement === "notif-unread"
      ? allUnreadNotification
      : allNotificationCount;


  const handleNotificationClick = async(id, task_seq_id, notify_type) => {
   
    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      await axios.post(
        `${BASE_URL}/notification/mark-read`,
        { id },
        { headers: headers }
      );
      getReadNotifications();
    
      if (notify_type === "task_created") {
        // nav('/task-list')
        nav(`/task-details/${task_seq_id}/?notify=${id}`, { replace: true });
      }
      
      onclose();
    } catch (error) {
      console.log(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      await axios.post(
        `${BASE_URL}/notification/mark-read`,
        { id: "" },
        { headers: headers }
      );

      await getReadNotifications();
      setUnReadNotifications([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleMarkRead = () => {
    markAllAsRead();
    // handleMakeZero();
    // getUnreadNotifications();
  };
 
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const seconds = Math.floor((now - past) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return `${seconds} seconds ago`;
  };

  return (
    <>
      {isNotificationPopUpOpen && (
        <div className="notification-page">
          <div className="notification-div">
            <div className="notif-top">
              <div className="notification-title">
                <span style={{ color: "#257180", fontSize: "24px" }}>
                  Notifications
                </span>
              </div>
              <div className="notification-close-btn">
                <CloseIcon onClick={handleClose} />
              </div>
            </div>
            <div className="notification-all-unread">
              <div
                className={`notif-all ${activeElement === "notif-all" ? "border-highlight" : ""}`}
                onClick={() => 
                  setActiveElement("notif-all")
                }
              >
                <span>All</span>
              </div>
              <div
                className={`notif-unread ${activeElement === "notif-unread" ? "border-highlight" : ""}`}
                onClick={() => 
                  setActiveElement("notif-unread")
                }
              >
                <span>Unread ({allUnreadNotification || 0})</span>
              </div>
            </div>
            <div className="mark-read">
              <span 
              onClick={handleMarkRead}
              >Mark all as read</span>
            </div>
            <div className="notifications" ref={containerRef}>
              <InfiniteScroll
                dataLength={notificationsToDisplay.length}
                // next={() => {
                //   if (!loading) {
                //     dispatch(fetchAllNotifications(activePage));
                //   }
                // }}
                hasMore={notificationsToDisplay.length < notificationsCount}
                loader={
                  <div className="loading-indicator" style={{ color: "black" }}>
                    <h4>Loading...</h4>
                  </div>
                }
              >
                {notificationsToDisplay.map((element, index) => (
                  <div
                    key={index}
                    className="notified-box"
                    onClick={() => handleNotificationClick(element._id, element.task_seq_id, element.notify_type)}
                  >
                    <img
                      width="35px"
                      height="35px"
                      src="https://cdn-icons-png.freepik.com/256/5030/5030196.png"
                      alt="Notification Icon"
                    />
                    <div className="notif-content">
                      <div className="notifi-desc">
                        <span className="notif-ticket">
                          {element.notification_title}
                        </span>
                        <span className="task-seq-id">
                          {" "}({element.task_seq_id})
                        </span>
                        <span className="notify-time">
                          {formatTimeAgo(element.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
