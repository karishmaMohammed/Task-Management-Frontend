import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../constant";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import axios from "axios";
import "./Notification.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../helpers/PopUpHelper";

const LIMIT = 20;
function Notification() {
  const { isNotificationPopUpOpen, handleNotificationPopUpToggle } = usePopup();

  const [activeElement, setActiveElement] = useState("notif-all");
  const [unReadNotification, setUnReadNotifications] = useState([]);
  const [allNotification, setAllNotifications] = useState([]);
  const [allUnreadNotification, setAllUnReadNotifications] = useState(0);
  const [allNotificationCount, setAllNotificationsCount] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const nav = useNavigate();

  const containerRef = useRef(null);

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
  // console.log(notificationsToDisplay)
  const notificationsCount =
    activeElement === "notif-unread"
      ? allUnreadNotification
      : allNotificationCount;

  const handleClose = () => {
    onclose();
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
    const dateObject = new Date(timestamp);
    const now = new Date();
    const timeDifference = now - dateObject;

    if (timeDifference < 60 * 1000) {
      // Less than a minute
      return `${Math.floor(timeDifference / 1000)} sec${
        timeDifference >= 2000 ? "s" : ""
      } ago`;
    } else if (timeDifference < 60 * 60 * 1000) {
      // Less than an hour
      return `${Math.floor(timeDifference / (60 * 1000))} min${
        timeDifference >= 120000 ? "s" : ""
      } ago`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
      // Less than a day
      return `${Math.floor(timeDifference / (60 * 60 * 1000))} hour${
        timeDifference >= 7200000 ? "s" : ""
      } ago`;
    } else if (timeDifference < 48 * 60 * 60 * 1000) {
      // Less than 2 days
      return "yesterday";
    } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
      // Less than a week
      return `${Math.floor(timeDifference / (24 * 60 * 60 * 1000))} day${
        timeDifference >= 172800000 ? "s" : ""
      } ago`;
    } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
      // Less than a month
      return `${Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000))} week${
        timeDifference >= 1209600000 ? "s" : ""
      } ago`;
    } else if (timeDifference < 365 * 24 * 60 * 60 * 1000) {
      // Less than a year
      return `${Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000))} month${
        timeDifference >= 2629746000 ? "s" : ""
      } ago`;
    } else {
      // More than a year
      return `${Math.floor(timeDifference / (365 * 24 * 60 * 60 * 1000))} year${
        timeDifference >= 31556952000 ? "s" : ""
      } ago`;
    }
  };

  //   return <span>{formattedTime}</span>;
  // };

  const handleNotificationClick = async (id, ticketId, notify_types) => {
    // console.log('Clicked on notification with id:', ticketId);
    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      await axios.post(
        `${BASE_URL}/v1/notification/mark-all-read`,
        { id },
        { headers: headers }
      );
      getReadNotifications();
      // window.location.pathname=`/ticket-view/${ticketId}/?notify=${id}`
      // nav(`/ticket-view/${ticketId}/?notify=${id}`, { replace: true });
      if (notify_types === "create-task") {
        nav(`/org-home/?notify=${id}`, { replace: true });
      }
      onclose();
    } catch (error) {
      console.log(error);
    }
  };
  // const handleClick =()=>{
  //   setActiveElement(element)
  // }
  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      getReadNotifications();
    }
  };
  const handleNextFunction = () => {
    getReadNotifications();
  };

  const handleReload = async () => {
    await getReadNotifications();
  };

  return (
    <>
      {isNotificationPopUpOpen && (
        <div className="notification-page">
          <div className="notification-div">
            <div className="notif-top">
              <div className="notification-title">
                {/* <img src={`${ASSET_PREFIX_URL}bell_icon.png`} alt="" /> */}
                <span style={{ color: "#257180", fontSize: "24px" }}>
                  Notifications
                </span>
                {/* <img
               onClick={() => handleReload()}
             //   src={`${ASSET_PREFIX_URL}refresh_2805355.png`}
               title="refresh"
               alt=""
               style={{ cursor: "pointer" }}
             /> */}
              </div>

              <div className="notification-close-btn">
                <CloseIcon onClick={handleNotificationPopUpToggle} />
              </div>
            </div>

            <div className="notification-all-unread">
              <div
                className={`notif-all ${
                  activeElement === "notif-all" ? "border-highlight" : ""
                }`}
                onClick={() => setActiveElement("notif-all")}
              >
                <span>All</span>
              </div>
              <div
                className={`notif-unread ${
                  activeElement === "notif-unread" ? "border-highlight" : ""
                }`}
                onClick={() => {
                  setActiveElement("notif-unread");
                  // Reset page when switching to unread notifications
                }}
              >
                <span>
                  Unread ({allUnreadNotification ? allUnreadNotification : 0})
                </span>
              </div>
            </div>
            <div className="mark-read">
              <span onClick={handleMarkRead}>Mark all as read</span>
            </div>
            <div
              className="notifications"
              onScroll={handleScroll}
              ref={containerRef}
            >
              <InfiniteScroll
                dataLength={notificationsToDisplay.length}
                next={() => handleNextFunction()}
                hasMore={notificationsToDisplay.length < notificationsCount}
                loader={
                  <div className="loading-indicator" style={{ color: "black" }}>
                    <h4>Loading...</h4>
                  </div>
                }
                // endMessage={
                //   <p style={{ textAlign: "center", marginTop: "10px" }}>
                //     <b>Yay! You have seen it all</b>
                //   </p>
                // }
              >
                {notificationsToDisplay.map((element, index) => (
                  <div
                    key={index}
                    className="notified-box"
                    onClick={() =>
                      handleNotificationClick(
                        element._id,
                        element.ticket_sequence_id,
                        element.notify_type
                      )
                    }
                  >
                    <img
                      width="35px"
                      height="35px"
                      src="https://marathon-web-assets.s3.ap-south-1.amazonaws.com/Add+action-d3.svg"
                    />

                    <div className="notif-content">
                      <div className="notifi-desc">
                        {element.notify_type === "create-task" && (
                          <span className="notif-ticket">
                            {" "}
                            {element.member_name} added a comment in{" "}
                            {element.ticket_sequence_id}.{" "}
                          </span>
                        )}

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
