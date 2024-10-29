import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { usePopup } from "../../helpers/PopUpHelper";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../constant";

function ActivityLogChangePopUp({ prevData, newData, customData, taskId,keyValuePair }) {
  const { isActivityChangePopUpOpen, handleActivityChangePopUpToggle } =
    usePopup();
  const handleEditTaskDetails = async () => {
    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      let response;
      if(customData){
       
      response = await axios.post(`${BASE_URL}/task/edit-task-details`, 
          { task_id : taskId, prev_obj: prevData, new_obj: newData},{headers});
      }else if(!customData){
       response = await axios.post(`${BASE_URL}/task/edit-def-task-details`, 
          {updateData:keyValuePair, task_id : taskId, prev_obj: prevData, new_obj: newData},{headers});
      }
        console.log(response.data.meta.message);
    } catch (error) {
      console.log(error);
    }
  };
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
              <button
                className="change-logs-save-btns"
                onClick={handleEditTaskDetails}
              >
                Change
              </button>
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
