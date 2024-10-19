import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskDetails } from "../../redux/actions/taskAction"; // Import the Redux action
import { FaEdit, FaSave } from "react-icons/fa"; // Added FaSave for the save icon
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md"; // Added MdCancel for the cancel icon
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TaskManagement.css";
import Select from "react-select";
import DateContainer from "./DateContainer";
import ActivitySideOpen from "./ActivitySideOpen";
import { usePopup } from "../../helpers/PopUpHelper";
import Loader from "../Loader/Loader";
import CommentPopUp from "./CommentPopUp";

function TaskDetailsPage() {
  const { task_sequence_id } = useParams();

  const {
    isActivityPopUpOpen,
    handleActivityPopUpToggle,
    isCommentPopUpOpen,
    handleCommentPopUpToggle,
  } = usePopup();

  const nav = useNavigate();

  // Redux hooks to dispatch action and select state
  const dispatch = useDispatch();
  const { taskDetails, loading, error } = useSelector((state) => state.tasks);

  // State for managing edit mode and original values
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  // To store original values for canceling edits
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTaskDetails(task_sequence_id));
  }, [task_sequence_id, dispatch]);

  useEffect(() => {
    if (taskDetails) {
      setEditedTitle(taskDetails.task_title || "Default Title");
      setEditedDescription(taskDetails.description || "No Description");
      setOriginalTitle(taskDetails.task_title || "Default Title");
      setOriginalDescription(taskDetails.description || "No Description");
    }
  }, [taskDetails]);

  // Save changes handlers
  const handleSaveTitle = () => {
    setIsTitleEditable(false);
    setOriginalTitle(editedTitle); // Update the original title after saving
    // Optionally: dispatch an action to save the updated title
  };

  const handleSaveDescription = () => {
    setIsDescriptionEditable(false);
    setOriginalDescription(editedDescription); // Update the original description after saving
    // Optionally: dispatch an action to save the updated description
  };

  // Cancel changes handlers
  const handleCancelTitle = () => {
    setEditedTitle(originalTitle); // Revert to the original title
    setIsTitleEditable(false); // Exit edit mode
  };

  const handleCancelDescription = () => {
    setEditedDescription(originalDescription); // Revert to the original description
    setIsDescriptionEditable(false); // Exit edit mode
  };

  // Loading and Error states
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxWidth: "369px",
      minWidth: "150px",
    }),
    menu: (provided) => ({
      ...provided,
      maxWidth: "369px", // Set the maximum width for the dropdown menu
    }),
  };

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
              {isTitleEditable ? (
                <>
                  <textarea
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    style={{ maxWidth: "95%" }}
                  />
                  <FaSave
                    className="edit-icon"
                    style={{ width: "20px", height: "20px" }}
                    onClick={handleSaveTitle}
                  />
                  <MdCancel
                    className="edit-icon"
                    style={{ width: "20px", height: "20px", marginLeft: "8px" }}
                    onClick={handleCancelTitle}
                  />
                </>
              ) : (
                <>
                  <span style={{ maxWidth: "95%" }}>{editedTitle}</span>
                  <FaEdit
                    className="edit-icon"
                    style={{ width: "20px", height: "20px" }}
                    onClick={() => setIsTitleEditable(true)}
                  />
                </>
              )}
            </div>
          </div>

          {/* Priority and Status */}
          <div className="details-field-details-div">
            <div className="details-field-details-div-left">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "20px",
                  justifyContent: "space-between",
                  paddingRight: "20px",
                  boxSizing: "border-box",
                }}
              >
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
                <div className="details-field-priority">
                  <div className="details-label-priority">Status</div>
                  <Select
                    options={[
                      { label: "To Do", value: "draft" },
                      { label: "Pending", value: "pending" },
                      { label: "In Progress", value: "progress" },
                      { label: "Done", value: "completed" },
                    ]}
                    value={{ label: taskDetails?.task_status || "To Do" }}
                    styles={customStyles}
                    onChange={handleCommentPopUpToggle} // Open the pop-up on status change
                  />
                </div>
              </div>

              <div className="details-field-title">
                {isDescriptionEditable ? (
                  <>
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <FaSave
                      className="edit-icon"
                      style={{ width: "20px", height: "20px" }}
                      onClick={handleSaveDescription}
                    />
                    <MdCancel
                      className="edit-icon"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "8px",
                      }}
                      onClick={handleCancelDescription}
                    />
                  </>
                ) : (
                  <>
                    <textarea disabled value={editedDescription} />
                    <FaEdit
                      className="edit-icon"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => setIsDescriptionEditable(true)}
                    />
                  </>
                )}
              </div>

              {/* Sub-tasks section */}
              <div className="sub-tasks">
                <div className="sub-tasks-head">
                  <span>Sub tasks</span>
                  <CgAdd
                    className="sub-tasks-add"
                    onClick={() => nav("/task-form")}
                  />
                </div>
                <div className="sub-tasks-rows">
                  <div className="sub-tasks-rows-cont">
                    <span>title</span>
                    <span>due date</span>
                    <span>priority</span>
                  </div>
                  {/* Repeat sub-task rows */}
                </div>
              </div>
            </div>

            {/* Date Container */}
            <div className="details-field-details-div-right">
              <DateContainer tasks={[taskDetails?.due_date]} />
            </div>
          </div>

          {/* Comments Section */}
          <div>Comments Section</div>
          <div className="details-field-comments">
            <div className="details-field-comments-cont">
              <span>
                dnfhjdgdfghdfghjdfghdfhgdhdfghjdfghdfhgdhfgdhfg
                dnfhjdgdfghdfghjdfghdfhgdhfgdhfg
              </span>
              <MdDelete />
            </div>
            <div className="details-field-comments-cont">
              <span>
                dnfhjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfg
                dnfhjdgdfghdfghjdfghdfhgdhfgdhfg
              </span>
              <MdDelete />
            </div>
            <div className="details-field-comments-cont">
              <span>
                dnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfg
                dnfhjdgdfghdfghjdfghdfhgdhfgdhfg
              </span>
              <MdDelete />
            </div>
            <div className="details-field-comments-cont">
              <span>
                dnfhjdgdfghdfhgdhfgdhfgdnfhjdgdfghdfhgdhfgdhfg
                dnfhjdgdfghdfghjdfghdfhgdhfgdhfg
              </span>
              <MdDelete />
            </div>

            {/* https://www.freepik.com/icon/time-management_562182#fromView=search&page=3&position=2&uuid=c795b95a-c669-477c-8978-1e6d960dbea6 */}
          </div>
        </div>

        {/* Activity Sidebar */}
        <div className="details-right-cont">
          <div className="details-right-cont-top">
            <img
              onClick={handleActivityPopUpToggle}
              title="Activity logs"
              src="https://cdn-icons-png.freepik.com/256/562/562182.png?ga=GA1.2.1462843302.1696500966&semt=ais_hybrid"
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
      {isCommentPopUpOpen && <CommentPopUp taskId={taskDetails?._id} />}{" "}
      {/* Show CommentPopUp when true */}
    </>
  );
}

export default TaskDetailsPage;
