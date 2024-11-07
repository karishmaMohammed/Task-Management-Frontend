import React, { useState } from "react";
import axios from "axios";
import "./RegisterAndLogin.css";
import { BASE_URL } from "../../constant";
import { useNavigate } from "react-router-dom";
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
        localStorage.setItem("user_task_token", token);
        dispatch(fetchMemberDetails());
      }
    } catch (error) {
      console.error(error);
    }
  };
  
 
 

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
            gender: true,
          }
        );
        if (registerResponse.data.meta.success !== true) {
          toast.error(registerResponse.data.meta.message, toastStyle);
        }else{
          onclose();
          toast.success(registerResponse.data.meta.message, toastStyle);
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
          nav('/task-form')
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
                type="text"
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
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="login-signup-input">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="login-signup-input">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {togglePopUp === "register" && (
            <div className="login-signup-input">
              <span>Confirm password</span>
              <input
                type="password"
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
                  style={{width:'10px'}}
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                   style={{width:'10px'}}
                    type="radio"
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
