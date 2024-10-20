import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { usePopup } from "../../helpers/PopUpHelper";

function ActivityLogChangePopUp({prevData, newData}) {
  const { isActivityChangePopUpOpen, handleActivityChangePopUpToggle } =
    usePopup();
  return (
    <>
      {isActivityChangePopUpOpen && (
        <div className="change-logs">
          <div className="change-logs-cont">
            <div className="change-logs-head">
              <span>Changes made</span>
            </div>
            <div className="change-logs-content">
              <span style={{ textAlign: "left" }}>{prevData.value}</span>
              <FaArrowRight />
              <span style={{ textAlign: "left" }}>{newData.value}</span>
            </div>
            <div className="change-logs-btns">
              <button className="change-logs-save-btns">Change</button>
              <button
                className="change-logs-cance-btns"
                onClick={handleActivityChangePopUpToggle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivityLogChangePopUp;
