import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskDetails } from "../../redux/actions/taskAction"; // Import the Redux action
import { FaEdit } from "react-icons/fa";
import "./TaskManagement.css";
import Select from "react-select";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import DateContainer from "./DateContainer";
import ActivitySideOpen from "./ActivitySideOpen";
import { usePopup } from "../../helpers/PopUpHelper";

function TaskDetailsPage({ match }) {
  const { isActivityPopUpOpen, handleActivityPopUpToggle } = usePopup();
  const dispatch = useDispatch();
  
  const { taskDetails, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    const task_sequence_id = match.params.task_sequence_id; // Get task_sequence_id from route params
    dispatch(fetchTaskDetails(task_sequence_id));
  }, [dispatch, match.params.task_sequence_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="details-page" style={{ marginTop: "2.5%", marginLeft: "12%", padding: "24px" }}>
        <div className="details-left">
          {/* Title Field */}
          <div className="details-field-title">
            <div className="details-value-title">
              <div style={{ maxWidth: "95%" }}>{taskDetails.task_title || "Default Title"}</div>
              <FaEdit className="edit-icon" style={{ width: "20px", height: "20px" }} />
            </div>
          </div>

          {/* Priority and Status */}
          <div className="details-field-details-div">
            <div className="details-field-details-div-left">
              {/* Priority Field */}
              <div className="details-field-priority">
                <div className="details-label-priority">Priority</div>
                <div className="priority-color" style={{ backgroundColor: taskDetails.priority === "High" ? "red" : "blue" }} />
              </div>

              {/* Status Field */}
              <div className="details-field-status">
                <Select value={{ label: taskDetails.task_status || "To Do" }} options={[]} isDisabled />
              </div>

              {/* Description Field */}
              <div className="details-field">
                <textarea disabled value={taskDetails.description || "No Description"} />
              </div>
            </div>

            <div className="details-field-details-div-right">
              <DateContainer tasks={[]} />
            </div>
          </div>

          {/* Comments Section */}
          <div className="details-field-comments">Comments Section</div>
        </div>
        <div className="details-right-cont">
          <div className="details-right-cont-top">
            <img onClick={handleActivityPopUpToggle} title="Activity logs" src="activity-icon.png" alt="" />
          </div>
          <div className="details-right">
            <div className="details-right-top">
              <span style={{ color: "#257180", fontSize: "28px" }}>Dropped Fields</span>
            </div>
          </div>
        </div>
      </div>
      {isActivityPopUpOpen && <ActivitySideOpen />}
    </>
  );
}

export default TaskDetailsPage;
