import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComments } from "../../redux/actions/commentsAction";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa6";
import { usePopup } from "../../helpers/PopUpHelper";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../constant";

function CommentPopUp({ taskId,prevData, newData,keyValuePair }) {
    
  const { isCommentPopUpOpen, handleCommentPopUpToggle } = usePopup();

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const {loading, error, success } = useSelector(
    (state) => state.comment
  );

  const handleCreateComment = async() => {
    const headers = {
      "task-auth-token": Cookies.get("user_task_token"),
    };
    await axios.post(`${BASE_URL}/task/edit-def-task-details`, 
      {updateData:keyValuePair, task_id : taskId, prev_obj: prevData, new_obj: newData},{headers});
  
    dispatch(createComments(comment, taskId));

    if (success) {
      toast.success("Comment created successfully!", toastStyle);
      handleCommentPopUpToggle();
    }
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };

  if (loading) return <Loader />;
  if (error) {
    toast.error(error, toastStyle);
  }

  return (
    <div className="change-logs">
      <div className="change-logs-cont">
        <div className="change-logs-head">
          <span>Enter comment</span>
        </div>
        <div className="change-logs-content">
          <textarea
            placeholder="Leave a comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="change-logs-btns">
          <button
            className="change-logs-save-btns"
            onClick={() => handleCreateComment()}
          >
            Save
          </button>
          <button
            className="change-logs-cance-btns"
            onClick={handleCommentPopUpToggle}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentPopUp;
