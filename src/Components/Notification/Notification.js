import React, { useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllNotifications,
  setActiveElement,
  markAllNotificationsAsRead,
} from "../../redux/actions/notificationsAction"; // Import action creators
import InfiniteScroll from "react-infinite-scroll-component";
import { usePopup } from "../../helpers/PopUpHelper";
import "./Notification.css";

function Notification() {
  const { isNotificationPopUpOpen, handleNotificationPopUpToggle } = usePopup();
  const dispatch = useDispatch();

  const {
    activeElement,
    unReadNotification,
    allNotification,
    allUnreadNotification,
    allNotificationCount,
    activePage,
    loading,
    error,
  } = useSelector((state) => state.notifications);

  const containerRef = useRef(null);

  useEffect(() => {
    if (activeElement === "notif-all") {
      dispatch(fetchAllNotifications(activePage));
    }
    // } else {
    //   dispatch(fetchUnreadNotifications());
    // }
  }, [dispatch, activeElement, activePage]);

  const handleClose = () => {
    handleNotificationPopUpToggle();
  };

  const handleMarkRead = () => {
    dispatch(markAllNotificationsAsRead());
    // dispatch(fetchUnreadNotifications());
  };

  const handleNotificationClick = (id) => {
    // Handle notification click (e.g., navigate to task)
  };

  // Ensure notifications are arrays
  const notificationsToDisplay =
    activeElement === "notif-unread" ? unReadNotification || [] : allNotification || [];
  const notificationsCount =
    activeElement === "notif-unread" ? allUnreadNotification : allNotificationCount;

  // src/utils/timeUtils.js
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
                onClick={() => dispatch(setActiveElement("notif-all"))}
              >
                <span>All</span>
              </div>
              <div
                className={`notif-unread ${activeElement === "notif-unread" ? "border-highlight" : ""}`}
                onClick={() => dispatch(setActiveElement("notif-unread"))}
              >
                <span>Unread ({allUnreadNotification || 0})</span>
              </div>
            </div>
            <div className="mark-read">
              <span onClick={handleMarkRead}>Mark all as read</span>
            </div>
            <div className="notifications" ref={containerRef}>
              <InfiniteScroll
                dataLength={notificationsToDisplay.length}
                next={() => dispatch(fetchAllNotifications(activePage))}
                hasMore={notificationsToDisplay.length < notificationsCount}
                loader={<div className="loading-indicator" style={{ color: "black" }}><h4>Loading...</h4></div>}
              >
                {notificationsToDisplay.map((element, index) => (
                  <div key={index} className="notified-box" onClick={() => handleNotificationClick(element._id)}>
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
                        <span className="task-seq-id">{" "}({element.task_seq_id})</span>
                        <span className="notify-time">{formatTimeAgo(element.createdAt)}</span>
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
