import React, {useState, useEffect} from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constant";
import { handleNavigation } from "../../helpers/NavHelpers";
import Cookies from "js-cookie";
import upArrow from "../../Assets/ArrowUpRight.png";


function HomePage() {
  
  const nav = useNavigate();

  const handleNav = () => {
    handleNavigation(nav, 'task')
  }

  const handleLogout = () => {
    // Clear the token from cookies
    Cookies.remove("user_task_token");
    nav("/");
    // Optional: Clear local storage if you are using local storage as well
    // localStorage.clear();

    // Redirect to the login page after logout
  
  };
  return (
    <div className="home-page-container">
      <div className="home-page">
        <div className="home-page-text">
          <span className="home-page-text-head">TASK MANAGEMENT</span>
          <span className="home-page-text-matter">
            Task management project is a powerful tool designed to streamline
            the process of organizing, tracking, and completing tasks. Whether
            for personal productivity or team collaboration, this system ensures
            that tasks are effectively managed from start to finish. The
            platform allows users to create tasks, assign responsibilities, and
            set deadlines. Each task can include specific details such as
            descriptions, priority levels, and due dates, ensuring clarity and
            accountability for everyone involved. Additionally, you can track
            the progress of tasks with status updates and set notifications to
            remind users of upcoming deadlines. 
            Task management system is designed to improve productivity, communication,
            and accountabilityby providing a centralized platform to manage and track 
            tasks efficiently, whether for individuals or collaborative teams.
          </span>
        </div>
        <div className="home-page-logo">
          <div className="home-explore-btn">
            <button onClick={handleNav}>
              Explore
              <img src={upArrow} alt="arrow" />
            </button>
          </div>
          <img
            src="https://cdn-icons-png.freepik.com/256/5030/5030196.png?ga=GA1.1.
            706441703.1694584519&semt=ais_hybrid"
            alt="img"
          />
        </div>
      </div>

      {/* <div className="created-by">
        <span>Done by</span>
      </div> */}
    </div>
  );
}

export default HomePage;
