import React from "react";
import "./SideNavigator.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function SideNavigator() {
  const nav = useNavigate();

  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };

  const handleNavigations = (type) => {
    try {
      const token = Cookies.get("user_task_token");
      if(type === 'list' && token){
        nav('/task-list')
      }else if(type === 'task' && token){
        nav('/task-form')
      }else if(type === 'home'){
        nav('/home')
      }
    } catch (error) {
      toast.error('Somethins went wrong!', toastStyle);
    }
  }

  

  const handleLogout = () => {
    // Clear the token from cookies
    Cookies.remove("user_task_token");

    // Optional: Clear local storage if you are using local storage as well
    // localStorage.clear();

    // Redirect to the login page after logout
    nav("/home");
  };
  return (
    <>
      <div className="sidebar-nav-container">
        <div className="app-name-logo-navs">
        <div className="app-name-logo" onClick={()=> handleNavigations('home')}>
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
          <div className="task-nav"  onClick={()=> handleNavigations('task')}>
            <img
              src="https://cdn-icons-png.freepik.com/256/832/832221.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
              alt="task"
              width={40}
              height={40}
            />
            <span>Create Task</span>
          </div>
          <div className="task-nav" onClick={()=> handleNavigations('list')}>
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
       
        <div className="log-out-btn" onClick={()=>handleLogout()}>
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
