import React from "react";
import "./TaskManagement.css";
import CloseIcon from "@mui/icons-material/Close";
import { FaArrowRight } from "react-icons/fa6";
import { usePopup } from '../../helpers/PopUpHelper';


function ActivitySideOpen() {
 
  const { isActivityPopUpOpen, handleActivityPopUpToggle } = usePopup();

 
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
              <div className="activity-close-btn" onClick={handleActivityPopUpToggle}>
                <CloseIcon />
              </div>
            </div>

            <div className="activity-logs-div">
              <div className="activity-logs-cont-div">
                <div className="activity-logs-cont-div-top">
                  <span>title</span>
                  <span>time</span>
                </div>
                <div className="activity-logs-cont-div-bottom">
                  <span>hdfhdgfhdfhdgfhdfdfhdgfhdfhdgfhdfhdgf</span>
                  <FaArrowRight />
                  <span>hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf</span>
                </div>
              </div>

              <div className="activity-logs-cont-div">
                <div className="activity-logs-cont-div-top">
                  <span>title</span>
                  <span>time</span>
                </div>
                <div className="activity-logs-cont-div-bottom">
                  <span>hdfhdgfhdfhfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf</span>
                  <FaArrowRight />
                  <span>
                    hdfhfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivitySideOpen;
