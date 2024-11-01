import React from "react";
import "./TaskManagement.css";
import CloseIcon from "@mui/icons-material/Close";
import { FaArrowRight } from "react-icons/fa6";
import { usePopup } from "../../helpers/PopUpHelper";

function ActivitySideOpen({ activityData }) {
  const { isActivityPopUpOpen, handleActivityPopUpToggle } = usePopup();

  console.log(activityData, "activityData");

  return (
    <>
      {isActivityPopUpOpen && (
        <div className="activity-logs">
          <div className="activity-logs-cont">
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: "#257180", fontSize: "24px" }}>
                Activity logs
              </span>
              <div
                className="activity-close-btn"
                onClick={handleActivityPopUpToggle}
              >
                <CloseIcon />
              </div>
            </div>

            <div className="activity-logs-div">
              {activityData.map((log) => (
                <div className="activity-logs-cont-div" key={log._id}>
                  <div className="activity-logs-cont-div-top">
                    <span style={{ color: "#257180", fontSize: "16px" }}>{log.updatedBy.name}</span>
                    <span>{new Date(log.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="activity-logs-cont-div-bottom">
                    <span>{log.prevObj.value}</span>
                    <FaArrowRight />
                    <span>{log.newObj.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivitySideOpen;
