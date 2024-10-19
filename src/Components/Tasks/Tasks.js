import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTasks, deleteTask } from "../../redux/actions/taskAction"; // Assuming you have a fetchTasks action
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { handleNavigation } from "../../helpers/NavHelpers";
import "./Tasks.css";
import Cookies from "js-cookie";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MdDelete } from "react-icons/md";
import Loader from "../Loader/Loader";


function Tasks() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { loading, taskList, error, message } = useSelector((state) => state.tasks);

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; 


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleTaskDel = (e,task_id) => {
    e.stopPropagation()
    dispatch(deleteTask(task_id));
   if(message){
    toast.success(message, toastStyle);
   }
  }


  if (loading) {
    return <Loader />;
  }
 
  if (error) {
    toast.error(error, toastStyle);
  }


  const handleNav = () => {
    handleNavigation(nav, "task");
  };


  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = taskList.slice(indexOfFirstTask, indexOfLastTask); // Current tasks to display
  const totalPages = Math.ceil(taskList.length / tasksPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  return (
    <div style={{ marginTop: "5%", marginLeft: "15%", width: "100%" }}>
      <div className="upper-section">
        <span>Your Task List</span>
        <div className="search-new-task">
          <div className="task-search">
            <SearchIcon style={{ color: "#001325" }} />
            <input type="text" placeholder={"Search by task title"} />
          </div>
          <button onClick={() => handleNav()}>+ New Task</button>
        </div>
      </div>


      <div className="task-table-container">
        <table className="task-table-data">
          <thead>
            <tr style={{ padding: "10px" }}>
              <th>Task Id</th>
              <th>Task Title</th>
              <th>Due Date</th>
              <th>Task Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks && currentTasks.length > 0 ? (
              currentTasks.map((task) =>
                task ? (
                  <tr
                    key={task._id}
                    onClick={() =>
                      nav(`/task-details/${task.task_sequence_id}`)
                    }
                  >
                    <td>{task.task_sequence_id}</td>
                    <td>{task.task_title}</td>
                    <td>{task.due_date}</td>
                    <td>{task.task_status}</td>
                    <td><MdDelete onClick={(e)=> handleTaskDel(e,task._id)}/></td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td colSpan="4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Pagination controls */}
      {/* {totalPages > 1 && ( */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
      <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="prev-button"
          >
            <KeyboardBackspaceIcon />
            prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="next-button"
          >
            next
            <KeyboardBackspaceIcon style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>


      </div>
     
      {/* )} */}
    </div>
  );
}


export default Tasks;
