import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComments } from "../../redux/actions/commentsAction";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa6";
import { usePopup } from "../../helpers/PopUpHelper";

function CommentPopUp({ taskId }) {

  const { isCommentPopUpOpen, handleCommentPopUpToggle } = usePopup();

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { comments, loading, error, success } = useSelector((state) => state.comment);

  const handleCreateComment = () => {
    dispatch(createComments(comment, taskId));
    
    if(success){
        toast.success('Comment created successfully!', toastStyle);
        handleCommentPopUpToggle()
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
          <button className="change-logs-cance-btns" onClick={handleCommentPopUpToggle}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CommentPopUp;
