import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import RegisterAndLogin from "./Components/OnBoarding/RegisterAndLogin";
import EditDetails from "./Components/OnBoarding/EditDetails";
import NavBar from "./Components/HomePage/NavBar";
import LoggedInNavPage from "./Components/HomePage/LoggedInNavPage";
import Tasks from "./Components/Tasks/Tasks";
import TaskForm from "./Components/TaskManagement/TaskForm";
import SideNavigator from "./Components/SideNavigator/SideNavigator";
import SideBarAndNav from "./Components/SideBarAndNav";
import ActivityLogChangePopUp from "./Components/TaskManagement/ActivityLogChangePopUp";
import TaskDetailsPage from "./Components/TaskManagement/TaskDetailsPage";
import ActivitySideOpen from "./Components/TaskManagement/ActivitySideOpen";
import SettingsPage from "./Components/Settings/SettingsPage";

function App() {
  const [closePopUp, setClosePopUp] = useState(false);

  const handleClosePopUp = () => {
    setClosePopUp(false);
  };
  return (
    <div className="App" onClick={handleClosePopUp}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <NavBar closePopUp={closePopUp} setClosePopUp={setClosePopUp}>
                <HomePage />
              </NavBar>
            }
          />
          <Route
            path="/setting"
            element={
              <SideBarAndNav>
                <SettingsPage />
              </SideBarAndNav>
            }
          />

          <Route
            path="/signup"
            element={<RegisterAndLogin type="register" />}
          />
          <Route path="/login" element={<RegisterAndLogin type="login" />} />
          <Route path="/edit-details" element={<EditDetails type="edit" />} />
          <Route
            path="/change-password"
            element={<EditDetails type="password" />}
          />
          <Route
            path="/task-list"
            element={
              <SideBarAndNav>
                <Tasks />
              </SideBarAndNav>
            }
          />
          <Route path="/side-nav" element={<SideNavigator />} />
          <Route path="/activity" element={<ActivityLogChangePopUp />} />
          <Route
            path="/task-details/:task_sequence_id"
            element={
              <SideBarAndNav>
                <TaskDetailsPage />
              </SideBarAndNav>
            }
          />
          <Route
            path="/task-form"
            element={
              <SideBarAndNav>
                <TaskForm />
              </SideBarAndNav>
            }
          />

          <Route path="/home-nav" element={<NavBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
