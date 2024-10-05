import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../constant";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import axios from "axios";
import "./Notification.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const LIMIT = 20;
function Notification({ onclose, handleMakeZero }) {
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
        "x-auth-token": Cookies.get("token"),
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
        "x-auth-token": Cookies.get("token"),
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
    handleMakeZero();
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
        "x-auth-token": Cookies.get("token"),
      };
      await axios.post(
        `${BASE_URL}/v1/notification/mark-all-read`,
        { id },
        { headers: headers }
      );
      getReadNotifications();
      // window.location.pathname=`/ticket-view/${ticketId}/?notify=${id}`
      // nav(`/ticket-view/${ticketId}/?notify=${id}`, { replace: true });
      if (
        notify_types === "change-manager" ||
        notify_types === "department-updated" ||
        notify_types === "department created" ||
        notify_types === "member-removed"
      ) {
        nav(`/org-home/?notify=${id}`, { replace: true });
      }
      else if (
        notify_types === "create-template" ||
        notify_types === "version-template"
      ) {
        nav(`/template/?notify=${id}`, { replace: true });
      }
      else if (
        notify_types === "ec-create-template" ||
        notify_types === "ec-version-template"
      ) {
        nav(`/ec-template/?notify=${id}`, { replace: true });
      }
      else if (
        notify_types === "asset-template" ||
        notify_types === "create-asset-template"
      ) {
        nav(`/assets-template?notify=${id}`, { replace: true });
      }
      else if (notify_types === "supply-chain-version-template") {
        nav(`/supply-chain-templates?notify=${id}`, { replace: true });
      }
      else if (
        notify_types === "purchase-order-version-template" ||
        notify_types === "create-PO-template"
      ) {
        nav(`/purchase-order-templates?notify=${id}`, { replace: true });
      } else if (
        notify_types === "pc-created" 
      ) {
        nav(`/pc-templates?notify=${id}`, { replace: true });
      }
      else if (notify_types === "edit-ticket" || notify_types === "create-ticket") {
        nav(`/ticket-view/${ticketId}/?notify=${id}`, { replace: true });
      }
      else if (notify_types === "ec-created") {
        nav(`/all-ec-list/?notify=${id}`, { replace: true });
      }else if (notify_types === "prod-change-version-template"||notify_types === 'create-prod-chan-template') {
        nav(`/pc-templates/?notify=${id}`, { replace: true });
      }else {
        console.log('else part');
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
    <div className="notification-page">
      <div className="notification-div">
        <div className="notif-top">
          <div className="notification-title">
            {/* <img src={`${ASSET_PREFIX_URL}bell_icon.png`} alt="" /> */}
            <span>Notifications</span>
            {/* <img
              onClick={() => handleReload()}
            //   src={`${ASSET_PREFIX_URL}refresh_2805355.png`}
              title="refresh"
              alt=""
              style={{ cursor: "pointer" }}
            /> */}
          </div>

          <CloseIcon onClick={handleClose} />
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
                {/* {element.member_photo ?<img className='notifi-img' src=`${PHOTO_LINK}element.member_photo` />:
              <img className='notifi-img' src='https://marathon-web-assets.s3.ap-south-1.amazonaws.com/Add+action-d3.svg'/>} */}

                {/* <NameProfile
                  userName={element.member_name}
                  width="35px"
                  memberPhoto={element.member_photo}
                  fontweight="500"
                /> */}
                <img width="35px" height='35px' src="https://marathon-web-assets.s3.ap-south-1.amazonaws.com/Add+action-d3.svg"/>

                <div className="notif-content">
                  <div className="notifi-desc">
                    {/* {!element.notification_title ? (
                      <span className="notif-ticket">
                        {element.ticket_title} has created.
                      </span>
                    ) : (
                      <span className="notif-ticket">
                        {" "}
                        {element.notification_title} changed in{" "}
                        {element.ticket_title}.{" "}
                      </span>
                    )} */}

                    {element.notify_type === "create-comment" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} added a comment in{" "}
                        {element.ticket_sequence_id}.{" "}
                      </span>
                    )}
                    {element.notify_type === "delete-comment" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} delete a comment in{" "}
                        {element.ticket_sequence_id}.{" "}
                      </span>
                    )}
                    {element.notify_type === "create-ticket" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created new{" "}
                        {element.ticket_sequence_id} ticket.{" "}
                      </span>
                    )}
                    {element.notify_type === "edit-ticket" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} edited {"  "}
                        {element.notification_title} in{" "}
                        {element.ticket_sequence_id}.{" "}
                      </span>
                    )}
                    {element.notify_type === "create-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created {"  "}
                        {element.ticket_title} template.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}

                    {element.notify_type === "version-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated {"  "}
                        {element.notification_title} template from v
                        {element.ticket_sequence_id} to v{element.ticket_title}{" "}
                        . {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}

                    {element.notify_type === "department created" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created department{"  "}
                        {element.ticket_title} .{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type === "department-updated" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated department{"  "}
                        {element.ticket_title}.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type === "member-removed" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated{"  "}
                        {element.ticket_title} in org hierarchy.{" "}
                      </span>
                    )}
                    {/* change-manager */}
                    {element.notify_type === "change-manager" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated{"  "}
                        {element.ticket_title} in org hierarchy.{" "}
                      </span>
                    )}
                    {element.notify_type === "ec-version-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated {"  "}
                        {element.notification_title} EC template from v
                        {element.ticket_sequence_id} to v{element.ticket_title}{" "}
                        . {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type === "asset-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated {"  "}
                        {element.notification_title} asset template from v
                        {element.ticket_sequence_id} to v{element.ticket_title}{" "}
                        . {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type ===
                      "purchase-order-version-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated {"  "}
                        {element.notification_title} PO template from v
                        {element.ticket_sequence_id} to v{element.ticket_title}{" "}
                        . {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type ===
                      "supply-chain-version-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated {"  "}
                        {element.notification_title} Supplier template from v
                        {element.ticket_sequence_id} to v{element.ticket_title}{" "}
                        . {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}

                    {element.notify_type === "ec-create-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created {"  "}
                        {element.ticket_sequence_id} EC template.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}

                    {element.notify_type === "ec-created" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created {"  "}
                        {element.ticket_title} EC.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type === "create-PO-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created {"  "}
                        {element.ticket_title} PO template.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                     {element.notify_type === "pc-created" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created {"  "}
                        {element.ticket_title} PCI template.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type === "create-asset-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created {"  "}
                        {element.ticket_title} asset template.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    {element.notify_type === "create-prod-chan-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} created {"  "}
                        {element.ticket_title} PC template.{" "}
                        {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                     {element.notify_type ===
                      "prod-change-version-template" && (
                      <span className="notif-ticket">
                        {" "}
                        {element.member_name} updated {"  "}
                        {element.notification_title} PC template from v
                        {element.ticket_sequence_id} to v{element.ticket_title}{" "}
                        . {/* {element.ticket_sequence_id}.{" "} */}
                      </span>
                    )}
                    <span className="notify-time">
                      {formatTimeAgo(element.createdAt)}
                    </span>
                  </div>
                  {/* <div className="notifi-date">
                    <span className="notif-sub">
                      {element.ticket_sequence_id}
                    </span>
                  </div> */}
                </div>
              </div>
            ))}
          </InfiniteScroll>

          {/* {loading && <div className="loading-indicator">Loading...</div>} */}
        </div>
      </div>
    </div>
  );
}

export default Notification;