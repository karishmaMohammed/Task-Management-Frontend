import React from "react";
import "./TaskManagement.css";
import CloseIcon from "@mui/icons-material/Close";
import { FaArrowRight } from "react-icons/fa6";

function ActivitySideOpen({ shutDown }) {
  return (
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
          <div className="activity-close-btn">
          <CloseIcon onClick={shutDown} />
          </div>
         
        </div>
        <div className="activity-logs-div">
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhdgfhdfgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhdgfhdfdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhdgfhdfhdgfhdfhdhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhdgfhdfhdgfdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>{" "}
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>{" "}
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>{" "}
          <div className="activity-logs-cont-div">
            <div className="activity-logs-cont-div-top">
              <span>title</span>
              <span>time</span>
            </div>
            <div className="activity-logs-cont-div-bottom">
              <span>
                hdfhdgfhdfhfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
              <FaArrowRight />
              <span>
                hdfhfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgfhdfhdgf
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitySideOpen;
