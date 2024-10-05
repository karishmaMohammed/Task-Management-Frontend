// all task list in table form
import React from "react";
import "./Tasks.css";
import SearchIcon from "@mui/icons-material/Search";

function Tasks() {
  const departmentList = ["hai", "hello", "asalamuvalaikum"];
  return (
    <>
      <div style={{ marginTop: "5%", marginLeft: "15%", width: "100%" }}>
        <div className="upper-section">
          <span>Your Task List</span>
          <div className="search-new-task">
            <div className="task-search">
              <SearchIcon style={{ color: "#001325" }} />
              <input type="text" placeholder={"Search by task title"} />
            </div>

            <button>+ New Task</button>
          </div>
        </div>

        <div className="task-table-container">
          <table className="task-table-data">
            <thead>
              <tr>
                <th>Task Id</th>
                <th> Task Title </th>
                <th>Due Date</th>
                <th>Task Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Task Id</td>
                <td> Task Title </td>
                <td>Due Date</td>
                <td>Task Status</td>
              </tr>
              <tr>
                <td>Task Id</td>
                <td> Task Title </td>
                <td>Due Date</td>
                <td>Task Status</td>
              </tr>
              <tr>
                <td>Task Id</td>
                <td> Task Title </td>
                <td>Due Date</td>
                <td>Task Status</td>
              </tr>
              <tr>
                <td>Task Id</td>
                <td> Task Title </td>
                <td>Due Date</td>
                <td>Task Status</td>
              </tr>
              <tr>
                <td>Task Id</td>
                <td> Task Title </td>
                <td>Due Date</td>
                <td>Task Status</td>
              </tr>
              <tr>
                <td>Task Id</td>
                <td> Task Title </td>
                <td>Due Date</td>
                <td>Task Status</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>pagination</div>
      </div>
    </>
  );
}

export default Tasks;
