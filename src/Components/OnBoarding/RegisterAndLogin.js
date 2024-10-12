import React, { useState } from "react";
import axios from "axios";
import "./RegisterAndLogin.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemberDetails } from "../../redux/actions/memberAction";

function RegisterAndLogin({ type, onclose, setTokenValue }) {
  const nav = useNavigate();
  const [togglePopUp, setTogglePopUp] = useState(type);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
  });

  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const dispatch = useDispatch();

  const verifyMember = async (token) => {
    try {
      const response = await axios.post(
        BASE_URL + "/member/verify-member",
        {},
        {
          headers: {
            "task-auth-token": `${token}`,
          },
        }
      );

      if (response.data.meta.success) {
        Cookies.set("user_task_token", token);
        dispatch(fetchMemberDetails());
      }
    } catch (error) {
      console.error(error);
    }
  };
  // Step 1: Retrieve the persisted state from localStorage
  const persistedState = localStorage.getItem("persist:task_management");

  const parsedState = JSON.parse(persistedState);

  const memberDetails = JSON.parse(parsedState.member);
  const fullName = memberDetails.member_details.full_name;
  const notificationCount = memberDetails.notification_count;
  console.log(fullName); // "Mohammed Karishma"
  console.log(notificationCount); // 0

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (togglePopUp === "register") {
        const registerResponse = await axios.post(
          BASE_URL + "/member/register",
          {
            full_name: formData.name,
            email: formData.email,
            phone_number: formData.phoneNumber,
            password: formData.password,
            gender: formData.gender,
          }
        );
        if (registerResponse.data.meta.success !== true) {
          toast.error(registerResponse.data.meta.message, toastStyle);
        }
        console.log("Registering:", registerResponse);
      } else if (togglePopUp === "login") {
        const loginResponse = await axios.post(BASE_URL + "/member/login", {
          email: formData.email,
          password: formData.password,
        });
        if (loginResponse.data.meta.success !== true) {
          toast.error(loginResponse.data.meta.message, toastStyle);
        }
        const token = loginResponse.data.data.user_token;
        if (token) {
          verifyMember(token);
          nav("/task-list");
        }
        console.log("Logging in:", loginResponse);
      }
    } catch (error) {
      console.log("something went wrong!", error);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-signup-pop-up-div">
        {togglePopUp === "register" ? (
          <span>Register</span>
        ) : (
          <span>LogIn</span>
        )}
        <div className="login-signup-close" onClick={() => onclose()}>
          <CloseIcon />
        </div>

        <form onSubmit={handleSubmit}>
          {togglePopUp === "register" && (
            <div className="login-signup-input">
              <span>Name</span>
              <input
                togglePopUp="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          {togglePopUp === "register" && (
            <div className="login-signup-input">
              <span>Phone number</span>
              <input
                togglePopUp="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="login-signup-input">
            <span>Email</span>
            <input
              togglePopUp="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="login-signup-input">
            <span>Password</span>
            <input
              togglePopUp="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {togglePopUp === "register" && (
            <div className="login-signup-input">
              <span>Confirm password</span>
              <input
                togglePopUp="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          )}

          {togglePopUp === "register" && (
            <div className="login-signup-input">
              <span>Gender</span>
              <div className="login-signup-gender">
                <label>
                  <input
                    togglePopUp="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    togglePopUp="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>
          )}

          <div>
            <button togglePopUp="submit">
              {togglePopUp === "register" ? "Signup" : "Login"}
            </button>
          </div>

          <div>
            {togglePopUp === "register" ? (
              <span>
                Already registered? Please{" "}
                <a onClick={() => setTogglePopUp("login")}>Login</a>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <a onClick={() => setTogglePopUp("register")}>Signup</a>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterAndLogin;
