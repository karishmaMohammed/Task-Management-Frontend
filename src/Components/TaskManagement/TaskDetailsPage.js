import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  deleteComments,
} from "../../redux/actions/commentsAction";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../constant";
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
import { toast } from "react-toastify";
import CommentPopUp from "./CommentPopUp";
import ActivityLogChangePopUp from "./ActivityLogChangePopUp";

function TaskDetailsPage() {
  const { task_sequence_id } = useParams();
  const [keyValuePair, setKeyValuePair] = useState({});
  const [isCustomData, setIsCustomData] = useState(false);
  const [activityData, setActivityData] = useState([]);

  const {
    isActivityPopUpOpen,
    handleActivityPopUpToggle,
    isCommentPopUpOpen,
    handleCommentPopUpToggle,
    isActivityChangePopUpOpen,
    handleActivityChangePopUpToggle,
  } = usePopup();

  const nav = useNavigate();

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };

  // Redux hooks to dispatch action and select state
  const dispatch = useDispatch();
  const { taskDetails, loading, error, subTaskData } = useSelector(
    (state) => state.tasks
  );
  const { comments, commentLoading, success } = useSelector(
    (state) => state.comment
  );
  const [fieldsValues, setFieldsValues] = useState({});
  const [currentPriority, setCurrentPriority] = useState(null);
  const [prevObject, setPreviousObject] = useState({});
  const [newObject, setNewObject] = useState({});
  const [isFieldEditing, setIsFieldEditing] = useState({}); // To track which field is being edited
  const [previousTitle, setPreviousTitle] = useState(taskDetails?.task_title);
  const [data, setData] = useState(false);
  const handleSaveTitle = (key) => {
    setKeyValuePair({
      [key]: editedTitle,
    });
    setPreviousObject({
      display_name: key,
      value: taskDetails?.task_title,
    });
    setNewObject({
      display_name: key,
      value: editedTitle,
    });

    setIsTitleEditable(false);
  };

  const handleSaveCustomData = (display_name, value, prevValue) => {
    setPreviousObject({
      display_name: display_name,
      value: prevValue,
    });
    setNewObject({
      display_name: display_name,
      value: value,
    });
  };

  // Handle input change
  const handleCustomChange = (e, fieldName) => {
    setFieldsValues({
      ...fieldsValues,
      [fieldName]: e.target.value,
    });
    setIsCustomData(true);
  };

  // Handle edit toggle
  const toggleFieldEditing = (fieldName) => {
    setIsFieldEditing({
      ...isFieldEditing,
      [fieldName]: !isFieldEditing[fieldName],
    });
  };

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
  }, [task_sequence_id, dispatch, data]);

  useEffect(() => {
    if (taskDetails) {
      setEditedTitle(taskDetails.task_title || "Default Title");
      setEditedDescription(taskDetails.description || "No Description");
      setOriginalTitle(taskDetails.task_title || "Default Title");
      setOriginalDescription(taskDetails.description || "No Description");
      setCurrentPriority(taskDetails.priority);
      if (taskDetails?.custom_data) {
        setFieldsValues(
          Object.keys(taskDetails.custom_data).reduce((acc, key) => {
            acc[key] = taskDetails.custom_data[key]?.value || ""; // Safely access value
            return acc;
          }, {})
        );
      } else {
        setFieldsValues({}); // Default to an empty object if custom_data is undefined
      }
    }
  }, [taskDetails]);

  useEffect(() => {
    if (taskDetails) {
      dispatch(getComments(taskDetails?._id));
    }
  }, [dispatch, taskDetails?._id, data]);

  const handleDeleteComment = (comment_id) => {
    dispatch(deleteComments(comment_id));
    if (success) {
      
      toast.success("Comment deleted successfully!", toastStyle);
      dispatch(getComments(taskDetails?._id));
    }
  };

  
  const handleGetActivityLogs = async () => {
    try {
      const headers = {
        "task-auth-token": Cookies.get("user_task_token"),
      };
      const response = await axios.get(
        `${BASE_URL}/notification/get-task-acti-logs`,
        {
          headers,
          params: {
            task_id: taskDetails?._id,
          },
        }
      );
      setActivityData(response.data.data.task_activity_logs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveDescription = (key) => {
    setKeyValuePair({
      [key]: editedDescription,
    });
    setPreviousObject({
      display_name: "Task description",
      value: taskDetails?.description,
    });
    setNewObject({
      display_name: "Task description",
      value: editedDescription,
    });
    setIsDescriptionEditable(false);
  };
  const selectedStatus = (key,selected) => {
    setKeyValuePair({
      [key]: selected.label,
    });
    setPreviousObject({
      display_name: "Task status",
      value: taskDetails?.task_status,
    });
    setNewObject({
      display_name: "Task status",
      value: selected.label,
    });
    handleCommentPopUpToggle()
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
  if (loading || commentLoading) return <Loader />;

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

  const handleChangePriority = (key) => {
    setKeyValuePair({
      [key]: taskDetails?.priority === false ? true : false,
    });
    setPreviousObject({
      display_name: "Priority",
      value: taskDetails?.priority === true ? "Prior" : "Non Prior",
    });

    setNewObject({
      display_name: "Priority",
      value: taskDetails?.priority === false ? "Prior" : "Non Prior",
    });
    handleActivityChangePopUpToggle();
  };

  const dueDate = new Date(taskDetails?.due_date);

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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <span style={{ color: "#257180", fontSize: "24px" }}>
                    Task Title:{" "}
                  </span>
                  <textarea
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    style={{
                      width: "50%",
                      marginBottom: "10px",
                      fontSize: "14px",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      className="save-btn save"
                      onClick={() => {
                        handleSaveTitle("task_title");
                        handleActivityChangePopUpToggle();
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn cancel"
                      onClick={handleCancelTitle}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <span style={{ color: "#257180", fontSize: "24px" }}>
                    Task Title:{" "}
                  </span>
                  <br />
                  <span style={{ maxWidth: "95%" }}>{editedTitle}</span>&nbsp;
                  <FaEdit
                    className="edit-icon"
                    style={{ width: "20px", height: "20px", color: "blue" }}
                    onClick={() => setIsTitleEditable(true)}
                  />
                </div>
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
                        currentPriority === true ? "green" : "gray",
                    }}
                    onClick={() => handleChangePriority("priority")}
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
                    onChange={(selected) => selectedStatus('task_status',selected)} // Open the pop-up on status change
                  />
                </div>
              </div>

              <div className="details-field-title">
                {isDescriptionEditable ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <span style={{ color: "#257180", fontSize: "24px" }}>
                      Task Description:{" "}
                    </span>
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      style={{ marginBottom: "10px", fontSize: "14px" }}
                    />
                    <div style={{ display: "flex" }}>
                      <button
                        className="save-btn save"
                        onClick={() => {
                          handleSaveDescription("description");
                          handleActivityChangePopUpToggle();
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-btn cancel"
                        onClick={handleCancelDescription}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    <span style={{ color: "#257180", fontSize: "24px" }}>
                      Task Description:{" "}
                    </span>
                    <div style={{ display: "flex", width: "100%" }}>
                      <span style={{ fontSize: "20px" }}>
                        {editedDescription}
                      </span>{" "}
                      &nbsp;
                      <FaEdit
                        className="edit-icon"
                        style={{ width: "20px", height: "20px", color: "blue" }}
                        onClick={() => setIsDescriptionEditable(true)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sub-tasks section */}
              <div className="sub-tasks">
                <div className="sub-tasks-head">
                  <span>Sub tasks</span>
                  <CgAdd
                    className="sub-tasks-add"
                    onClick={() => nav(`/task-form/${task_sequence_id}`)}
                  />
                </div>
                <div className="sub-tasks-rows">
                  <div className="sub-tasks-rows-cont">
                    <span>Task ID</span>
                    <span>Task Title</span>
                    <span>Due Date</span>
                    <span>Task Status</span>
                  </div>
                  {/* Dynamically map over taskdetails.table */}

                  {subTaskData && subTaskData.length > 0 ? (
                    subTaskData.map((item) => (
                      <div
                        className="sub-tasks-rows-cont"
                        key={item._id}
                        onClick={() =>
                          nav(`/task-details/${item.task_sequence_id}`)
                        }
                      >
                        <span>{item.task_sequence_id}</span>
                        <span>{item.task_title}</span>

                        <span>{item.due_date}</span>

                        <span>{item.task_status}</span>
                      </div>
                    ))
                  ) : (
                    <div
                      className="no-data-message"
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Create sub-tasks.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Date Container */}
            <div className="details-field-details-div-right">
              <DateContainer
                task={{
                  id: 1,
                  name: "",
                  due_date: isNaN(dueDate)
                    ? new Date().toISOString().split("T")[0]
                    : dueDate.toISOString().split("T")[0],
                }}
                onUpdateDueDate={(newDate) =>
                  console.log("New Due Date:", newDate)
                }
              />
            </div>
          </div>

          {/* Comments Section */}
          <div style={{ color: "#257180", fontSize: "24px" }}>
            Comments Section
          </div>
          <div className="details-field-comments">
            {comments?.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="details-field-comments-cont">
                  <span>{comment.comment_message}</span>
                  <MdDelete
                    onClick={() => handleDeleteComment(comment._id)} // Add delete functionality
                  />
                </div>
              ))
            ) : (
              <div>No comments available</div>
            )}
          </div>
        </div>

        {/* Activity Sidebar */}
        <div className="details-right-cont">
          <div className="details-right-cont-top">
            <img
              onClick={() => {
                handleActivityPopUpToggle();
                handleGetActivityLogs();
              }}
              title="Activity logs"
              src="https://cdn-icons-png.freepik.com/256/562/562182.png?ga=GA1.2.1462843302.1696500966&semt=ais_hybrid"
              alt="Activity Icon"
            />
          </div>
          {taskDetails?.custom_data ? (
            <div className="details-right">
              <div className="details-right-top">
                <span
                  style={{
                    color: "#257180",
                    fontSize: "28px",
                    borderBottom: "1px solid black",
                  }}
                >
                  Dropped Fields
                </span>
                <div style={{ marginTop: "20px" }}>
                  {Object.keys(taskDetails.custom_data).map((key) => {
                    const field = taskDetails.custom_data[key];
                    return !field.is_default ? (
                      <div className="details-right-row" key={field._id}>
                        <span>{field.display_name}</span>
                        {isFieldEditing[field.display_name] ? (
                          <div
                            className="details-right-edit-row"
                            style={{ width: "100%" }}
                          >
                            {field.input_type === "text" && (
                              <input
                                className="details-right-input"
                                type="text"
                                value={fieldsValues[field.display_name]}
                                onChange={(e) =>
                                  handleCustomChange(e, field.display_name)
                                }
                              />
                            )}
                            {field.input_type === "link" && (
                              <input
                                className="details-right-input"
                                type="url"
                                value={fieldsValues[field.display_name]}
                                placeholder="Enter URL"
                                onChange={(e) =>
                                  handleCustomChange(e, field.display_name)
                                }
                              />
                            )}
                            {field.input_type === "number" && (
                              <input
                                className="details-right-input"
                                type="number"
                                value={fieldsValues[field.display_name]}
                                onChange={(e) =>
                                  handleCustomChange(e, field.display_name)
                                }
                              />
                            )}
                            <br />
                            {/* Save and Cancel Buttons */}
                            <button
                              className="save-btn save"
                              onClick={() => {
                                handleSaveCustomData(
                                  field.display_name,
                                  fieldsValues[field.display_name],
                                  field.value
                                );
                                handleActivityChangePopUpToggle();
                              }}
                            >
                              Save
                            </button>
                            <button
                              className="cancel-btn cancel"
                              onClick={() =>
                                toggleFieldEditing(field.display_name)
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="details-right-display-row">
                            {fieldsValues[field.display_name]} &nbsp;
                            <FaEdit
                              className="edit-icon"
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "blue",
                              }}
                              onClick={() =>
                                toggleFieldEditing(field.display_name)
                              }
                            />
                          </div>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Activity Side Panel */}
      {isActivityChangePopUpOpen && (
        <ActivityLogChangePopUp
          prevData={prevObject}
          newData={newObject}
          customData={isCustomData}
          taskId={taskDetails?._id}
          keyValuePair={keyValuePair}
          setData={setData}
        />
      )}
      {isActivityPopUpOpen && <ActivitySideOpen activityData={activityData} />}
      {isCommentPopUpOpen && <CommentPopUp keyValuePair={keyValuePair} taskId={taskDetails?._id} prevData={prevObject}
          newData={newObject}  setData={setData} />}{" "}
      {/* Show CommentPopUp when true */}
    </>
  );
}

export default TaskDetailsPage;
