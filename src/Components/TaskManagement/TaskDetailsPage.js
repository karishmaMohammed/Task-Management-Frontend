import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskDetails } from "../../redux/actions/taskAction"; // Import the Redux action
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./TaskManagement.css";
import Select from "react-select";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import DateContainer from "./DateContainer";
import ActivitySideOpen from "./ActivitySideOpen";
import { usePopup } from "../../helpers/PopUpHelper";
import Loader from "../Loader/Loader";

function TaskDetailsPage() {
  const { task_sequence_id } = useParams();

  const { isActivityPopUpOpen, handleActivityPopUpToggle } = usePopup();

  // Redux hooks to dispatch action and select state
  const dispatch = useDispatch();
  const { taskDetails, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskDetails(task_sequence_id));
  }, [task_sequence_id, dispatch]); 

  // Loading and Error states
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
  
      <div
        className="details-page"
        style={{ marginTop: "2.5%", marginLeft: "12%", padding: "24px" }}
      >
        <div className="details-left">
          {/* Title Field */}
          <div className="details-field-title">
            <div className="details-value-title">
              <div style={{ maxWidth: "95%" }}>
                {taskDetails?.task_title || "Default Title"}
              </div>
              <FaEdit
                className="edit-icon"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          </div>

          {/* Priority and Status */}
          <div className="details-field-details-div">
            <div className="details-field-details-div-left">
              {/* Priority Field */}
              <div className="details-field-priority">
                <div className="details-label-priority">Priority</div>
                <div
                  className="priority-color"
                  style={{
                    backgroundColor:
                      taskDetails?.priority === "High" ? "red" : "blue",
                  }}
                />
              </div>

              {/* Status Field */}
              <div className="details-field-status">
                <Select
                  value={{ label: taskDetails?.task_status || "To Do" }}
                  options={[
                    { label: "To Do", value: "to-do" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Done", value: "done" },
                  ]}
                  isDisabled
                />
              </div>

              {/* Description Field */}
              <div className="details-field">
                <textarea
                  disabled
                  value={taskDetails?.description || "No Description"}
                />
              </div>
            </div>

            {/* Date Container */}
            <div className="details-field-details-div-right">
              <DateContainer tasks={[]} />
            </div>
          </div>

          {/* Comments Section */}
          <div className="details-field-comments">Comments Section</div>
        </div>

        {/* Activity Sidebar */}
        <div className="details-right-cont">
          <div className="details-right-cont-top">
            <img
              onClick={handleActivityPopUpToggle}
              title="Activity logs"
              src="activity-icon.png"
              alt="Activity Icon"
            />
          </div>
          <div className="details-right">
            <div className="details-right-top">
              <span style={{ color: "#257180", fontSize: "28px" }}>
                Dropped Fields
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Activity Side Panel */}
      {isActivityPopUpOpen && <ActivitySideOpen />}
    </>
  );
}

export default TaskDetailsPage;
