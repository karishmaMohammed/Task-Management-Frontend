import React from "react";
import "./SideNavigator.css";

function SideNavigator() {
  return (
    <>
      <div className="sidebar-nav-container">
        <div className="app-name-logo-navs">
        <div className="app-name-logo">
          <img
            src="https://cdn-icons-png.freepik.com/256/5030/5030196.png?ga=GA1.1.
            706441703.1694584519&semt=ais_hybrid"
            alt="task"
            width={50}
            height={50}
          />
          <span>Prioritise Task</span>
        </div>
        <div className="task-navigators">
          <div className="task-nav">
            <img
              src="https://cdn-icons-png.freepik.com/256/832/832221.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
              alt="task"
              width={40}
              height={40}
            />
            <span>Create Task</span>
          </div>
          <div className="task-nav">
            <img
              src="https://cdn-icons-png.freepik.com/256/13485/13485450.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid"
              alt="task"
              width={40}
              height={40}
            />
            <span>Tasks </span>
          </div>
        </div>
        </div>
       
        <div className="log-out-btn">
          <img
            src="https://cdn-icons-png.freepik.com/256/16312/16312100.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid"
            alt="logout"
            width={40}
            height={40}
          />
          <span>Log Out</span>
        </div>
      </div>
    </>
  );
}

export default SideNavigator;
