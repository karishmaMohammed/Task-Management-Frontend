import React from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { usePopup } from "../../helpers/PopUpHelper";
import "./Setting.css";

function SettingsPopUp({ memberPhoto, memberName, memberEmail }) {
  const { isSettingPopUpOpen, handleSettingPopUpToggle } = usePopup();
  const nav = useNavigate();
  const HandleSetting = () => {
    nav("/setting");
  };
  return (
    <>
      {isSettingPopUpOpen && (
        <div className="member-settings-page-div">
          <div className="cross-icon">
            <div className="cross-hover-effect">
              <CloseIcon onClick={handleSettingPopUpToggle} />
            </div>
          </div>
          <br />
          <br />
          <div className="member-setting-details">
            <div>
              Hi, <a className="member-name-span">{memberName}</a>
            </div>
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src={memberPhoto}
              alt=""
            />
            {/* <img src={memberPhoto?PHOTO_LINK+memberPhoto:DEFAULT_PHOTO} alt='' /> */}
            <span>{memberEmail}</span>
            <button
              title="settings"
              className="member-settings-btn"
              onClick={() => {
                handleSettingPopUpToggle();
                HandleSetting();
              }}
            >
              <img
                src="https://cdn-icons-png.freepik.com/256/738/738853.png?uid=R132949527&ga=GA1.1.706441703.1694584519&semt=ais_hybrid"
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
              />
              &nbsp;&nbsp;&nbsp; Manage your Settings
            </button>{" "}
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export default SettingsPopUp;
