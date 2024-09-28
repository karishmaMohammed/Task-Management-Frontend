import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


function RegisterAndLogin({ type }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const verifyMember = async(token) => {
    try {
      const response = await axios.post(
        BASE_URL + "/member/verify-member",
        {},
        {
          headers: {
            "x-auth-token": `${token}`,
          },
        }
      );
      
      if (response.data.meta.success) {
        Cookies.set("user_token", token);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (type === "register") {
        const registerResponse = await axios.post(BASE_URL + "/member/register", {
         full_name : formData.name,
         email: formData.email,
         phone_number:formData.phoneNumber,
         password: formData.password,
         gender: formData.gender,
       })
         console.log("Registering:", registerResponse);
       } else if(type === "login"){
         const loginResponse = await axios.post(BASE_URL + '/member/login', {
           email:formData.email, password: formData.password
         });
         if(loginResponse.data.meta.success !== true){
           toast.error(loginResponse.data.meta.message)
         }
         const token = loginResponse.data.data.user_token;
         if(token){
           verifyMember(token)
         }
         console.log("Logging in:", loginResponse);
       }
    } catch (error) {
      console.log('something went wrong!', error)
    }
   
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {type === "register" && (
          <div>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}
        {type === "register" && (
          <div>
            <span>Phone number</span>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {type === "register" && (
          <div>
            <span>Confirm password</span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}

        {type === "register" && (
          <div>
            <span>Gender</span>
            <div>
              <label>
                <input
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
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>
        )}

        <div>
          <button type="submit">
            {type === "register" ? "Signup" : "Login"}
          </button>
        </div>

        <div>
          {type === "register" ? (
            <span>
              Already registered? Please <a href="/login">Login</a>
            </span>
          ) : (
            <span>
              Don't have an account? <a href="/signup">Signup</a>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterAndLogin;
