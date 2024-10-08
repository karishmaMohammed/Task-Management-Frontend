import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import RegisterAndLogin from "../OnBoarding/RegisterAndLogin";



function NavBar({ children }) {
  const [mode, setMode] = useState(false);
  const [logInSignupPopUp, setLogInSignupPopUp] = useState(false);
  const [action, setAction] = useState("");
  const [tokenvalue, setTokenValue] = useState('')

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
  const handleMode = () => {
    setMode((prev) => !prev);
  };
  const handleLogInSignupPopUp = (action) => {
    setAction(action);
    setLogInSignupPopUp(!logInSignupPopUp);
  };
  return (
    <>
      <div className="home-nav-container">
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
          <button onClick={() => handleLogInSignupPopUp("login")}>LogIn</button>
          <button onClick={() => handleLogInSignupPopUp("signup")}>
            SignUp
          </button>
          {mode ? (
            <img
              src="https://cdn-icons-png.freepik.com/256/17329/17329316.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
              alt="lite-mode"
              width={40}
              height={40}
              onClick={handleMode}
            />
          ) : (
            <img
              src="https://cdn-icons-png.freepik.com/256/547/547433.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
              alt="dark-mode"
              width={40}
              height={40}
              onClick={handleMode}
            />
          )}
        </div>
      </div>
      {children}
      {logInSignupPopUp && (
        <RegisterAndLogin
          type={action}
          onclose={() => setLogInSignupPopUp(!logInSignupPopUp)}
          setTokenValue={setTokenValue}
        />
      )}
    </>
  );
}

export default NavBar;
