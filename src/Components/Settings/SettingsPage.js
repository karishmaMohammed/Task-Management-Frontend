import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileInfo,
  updateProfile,
} from "../../redux/actions/settingsAction";
import { toast } from "react-toastify";

function SettingsPage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileDetails.profile);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });

  // Fetch profile information from Redux and update the form state
  useEffect(() => {
    dispatch(getProfileInfo());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        email: profile.email || "",
        phoneNumber: profile.phone_number || "",
        gender: profile.gender || "Male",
      });
    }
  }, [profile]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle save button click using Redux action
  const handleSave = () => {
    dispatch(
      updateProfile(
        formData.fullName,
        formData.email,
        formData.phoneNumber,
        formData.gender
      )
    );

    // Show success toast
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="setting-container">
      <div className="setting-heading">
        <span>SETTINGS</span>
      </div>
      <div className="setting-img">
        <img
          src="https://cdn-icons-png.freepik.com/256/3984/3984678.png?ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
          alt="Profile"
        />
      </div>

      <div className="setting-input">
        <div className="login-signup-input">
          <span>Full Name</span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
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
          <span>Phone Number</span>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="login-signup-input">
          <span>Gender</span>
          <div className="login-signup-gender">
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
          </div>
        </div>
      </div>

      <div className="setting-save-btn">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default SettingsPage;
