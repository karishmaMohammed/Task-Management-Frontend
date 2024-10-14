import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileInfo,
  updateProfile,
  changePassword,
} from "../../redux/actions/settingsAction";
import { toast } from "react-toastify";

function SettingsPage() {
  const [selectedSection, setSelectedSection] = useState("general");

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileDetails.profile);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  console.log(formData, "formData");
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
        gender: profile.gender || "",
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
  const handleSectionClick = (section) => {
    setSelectedSection(section);
    // navigate(`/settings?tab=${section}`);
  };
  // Handle save button click using Redux action
  const handleProfileSave = () => {
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

  const handlePasswordSave = () => {
    console.log(formData)
    dispatch(
      changePassword(
        formData.oldPassword,
        formData.password,
        formData.confirmPassword
      )
    );
  }

  return (
    <div
      className="setting-container"
      style={{ marginTop: "75px", marginLeft: "200px", marginRight: "5px" }}
    >
      <div className="setting-heading">
        <span style={{ color: "#257180", fontSize: "24px" }}>
          {" "}
          Manage your settings
        </span>
      </div>
      <div className="setting-navs">
        <div
          className={`generals${
            selectedSection === "general" ? " settingActive" : ""
          }`}
          onClick={() => handleSectionClick("general")}
          style={{
            cursor: "pointer",
            boxShadow:
              selectedSection === "general"
                ? "0px 3px 0px 0px #FF7A7A"
                : "none",
            padding: "10px 16px",
            color: selectedSection === "general" ? "#FF7A7A" : "black",
          }}
        >
          Profile
        </div>

        <div
          className={`privacys${
            selectedSection === "privacy" ? " settingActive" : ""
          }`}
          onClick={() => handleSectionClick("privacy")}
          style={{
            cursor: "pointer",
            boxShadow:
              selectedSection === "privacy"
                ? "0px 3px 0px 0px #FF7A7A"
                : "none",
            padding: "10px 16px",
            color: selectedSection === "privacy" ? "#FF7A7A" : "black",
          }}
        >
          Change password
        </div>
      </div>
      {selectedSection === "general" && (
        <>
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
            <div className="login-signup-input-radio">
              <span>Gender</span>
              <div className="login-signup-gender">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="setting-save-btn">
            <button onClick={handleProfileSave}>Save</button>
          </div>
        </>
      )}
      {selectedSection === "privacy" && (
        <>
          <div className="setting-input">
            <div className="login-signup-input">
              <span>Old password</span>
              <input
                type="password"
                name="oldPassword" 
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>
            <div className="login-signup-input">
              <span>New password</span>
              <input
                type="password"
                name="password" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="login-signup-input">
              <span>Confirm new password</span>
              <input
                type="password"
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="setting-save-btn">
            <button
            onClick={handlePasswordSave}
            >
              Change Password
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SettingsPage;
