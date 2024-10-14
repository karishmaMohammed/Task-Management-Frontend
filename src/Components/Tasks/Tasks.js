import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTasks } from "../../redux/actions/taskAction"; // Assuming you have a fetchTasks action
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { handleNavigation } from "../../helpers/NavHelpers";
import "./Tasks.css";
import Cookies from "js-cookie";

function Tasks() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { loading, taskList, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks when the component mounts
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };
  if (error) {
    toast.error(error, toastStyle);
  }

  const handleNav = () => {
    handleNavigation(nav)
  }
  

  return (
    <div style={{ marginTop: "5%", marginLeft: "15%", width: "100%" }}>
      <div className="upper-section">
        <span>Your Task List</span>
        <div className="search-new-task">
          <div className="task-search">
            <SearchIcon style={{ color: "#001325" }} />
            <input type="text" placeholder={"Search by task title"} />
          </div>
          <button onClick={()=>handleNav()}>+ New Task</button>
        </div>
      </div>

      <div className="task-table-container">
        <table className="task-table-data">
          <thead>
            <tr>
              <th>Task Id</th>
              <th>Task Title</th>
              <th>Due Date</th>
              <th>Task Status</th>
            </tr>
          </thead>
          <tbody>
            {taskList && taskList.length > 0 ? (
              taskList.map((task) => (
                <tr key={task._id}>
                  <td>{task.task_sequence_id}</td>
                  <td>{task.task_title}</td>
                  <td>{task.due_date}</td>
                  <td>{task.task_status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div>pagination</div>
    </div>
  );
}

export default Tasks;
