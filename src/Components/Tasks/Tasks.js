import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTasks, deleteTask } from "../../redux/actions/taskAction";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { handleNavigation } from "../../helpers/NavHelpers";
import { debounce } from "lodash";
import "./Tasks.css";
import Cookies from "js-cookie";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MdDelete } from "react-icons/md";
import Loader from "../Loader/Loader";

function Tasks() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(false);

  const { loading, taskList, totalPages, error, message } = useSelector(
    (state) => state.tasks
  );

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8; // Set to 10 to match the backend response

  useEffect(() => {
    dispatch(fetchTasks(searchTerm, currentPage));
  }, [dispatch, searchTerm, currentPage, data]);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
    setCurrentPage(1); // Reset page number on new search
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 100),
    []
  );

  const handleTaskDel = (e, task_id) => {
    e.stopPropagation();
    setData(task_id);
    dispatch(deleteTask(task_id));

    if (message) {
      toast.success(message, toastStyle);
    }
  };

  if (error) {
    toast.error(error, toastStyle);
  }

  const handleNav = () => {
    handleNavigation(nav, "task");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div style={{ marginTop: "5%", marginLeft: "15%", width: "100%" }}>
      <div className="upper-section">
        <span style={{ color: "#257180", fontSize: "24px" }}>
          Your Task List
        </span>
        <div className="search-new-task">
          <div className="task-search">
            <SearchIcon style={{ color: "#001325" }} />
            <input
              type="text"
              value={searchTerm}
              placeholder={"Search by task title"}
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <button onClick={() => handleNav()}>+ New Task</button>
        </div>
      </div>

      <div className="task-table-container">
        {loading ? (
          <Loader />
        ) : (
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
              {taskList && taskList.length > 0 ? (
                taskList.map((task) =>
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
                      <td>
                        <MdDelete onClick={(e) => handleTaskDel(e, task._id)} />
                      </td>
                    </tr>
                  ) : null
                )
              ) : (
                <tr>
                  <td colSpan="5">No tasks available</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
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
    </div>
  );
}

export default Tasks;
