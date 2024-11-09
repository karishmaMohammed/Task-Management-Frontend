import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../constant";
import { useNavigate } from "react-router-dom";
import RegisterAndLogin from "../OnBoarding/RegisterAndLogin";

function NavBar({ children }) {
  const [mode, setMode] = useState(false);
  const [logInSignupPopUp, setLogInSignupPopUp] = useState(false);
  const [action, setAction] = useState("");
  const token = localStorage.getItem("user_task_token");

  const nav = useNavigate();

  const customStyle = {
    control: (provided) => ({
      ...provided,
      width: "120px",
      backgroundColor: "white",
      border: "none",
      color: "black",
    }),
  };
  const featureOptions = [
    { value: "createTask", label: "Create Task" },
    { value: "taskPriority", label: "Task Priority" },
    { value: "taskStatus", label: "Task Status" },
  ];
  const handleMode = async (mode) => {
    try {
      const headers = { "task-auth-token": token };
      const response = await axios.post(
        BASE_URL + "/member/edit-details",
        { action: "update_mode", mode },
        { headers }
      );
      console.log(mode);
    } catch (error) {
      console.log(error);
    }
  };
  // /edit-details
  const handleMemberDetails = async () => {
    try {
      if (token) {
        const headers = { "task-auth-token": token };
        const response = await axios.get(
          BASE_URL + "/member/get-member-details",
          {
            headers,
          }
        );

        setMode(response.data.data.member_details.mode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isTokenExpired = () => {
    if (!token) return true;
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      const sevenDaysInSeconds = 7 * 24 * 60 * 60;
      console.log(decodedToken.exp < currentTime || decodedToken.exp > 
        currentTime + sevenDaysInSeconds)
      return decodedToken.exp < currentTime || decodedToken.exp > 
      currentTime + sevenDaysInSeconds;
    } catch (error) {
      console.error("Invalid token", error);
      return true;
    }
  };

  useEffect(() => {
    handleMemberDetails();
  }, []);
  const handleLogInSignupPopUp = (action) => {
    setAction(action);
    setLogInSignupPopUp(!logInSignupPopUp);
  };

  return (
    <>
      <div
        className={`home-nav-container ${mode ? "dark-mode" : "light-mode"}`}
      >
        <div className="app-name-features">
          <img
            src="https://cdn-icons-png.freepik.com/256/5030/5030196.png?ga=GA1.1.
            706441703.1694584519&semt=ais_hybrid"
            alt="task"
            width={50}
            height={50}
          />
          <span>Prioritise Task</span>&nbsp;&nbsp;&nbsp;
          <Select
            options={featureOptions}
            placeholder="Features"
            styles={customStyle}
          />
        </div>
        <div className="log-sign-mode-btns">
          {!token ? (
            <>
              <button onClick={() => handleLogInSignupPopUp("register")}>
                SignUp
              </button>
              <button onClick={() => handleLogInSignupPopUp("login")}>
                LogIn
              </button>
            </>
          ) : (
            isTokenExpired() && (
              <button onClick={() => handleLogInSignupPopUp("login")}>
                LogIn
              </button>
            )
          )}

          {token && (
            <>
              {mode ? (
                <img
                  src="https://cdn-icons-png.freepik.com/256/17329/17329316.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
                  alt="lite-mode"
                  width={40}
                  height={40}
                  onClick={() => handleMode(false)}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.freepik.com/256/547/547433.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
                  alt="dark-mode"
                  width={40}
                  height={40}
                  onClick={() => handleMode(true)}
                />
              )}
            </>
          )}
        </div>
      </div>
      {React.cloneElement(children, { mode, isTokenExpired })}
      {logInSignupPopUp && (
        <RegisterAndLogin
          type={action}
          onclose={() => setLogInSignupPopUp(!logInSignupPopUp)}
        />
      )}
    </>
  );
}

export default NavBar;
