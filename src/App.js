import "./App.css";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoggedInNavPage />} />
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
          <Route path="/task-form" element={<TaskForm />} />
          <Route
            path="/home"
            element={
              <NavBar>
                <HomePage />
              </NavBar>
            }
          />
          <Route path="/home-nav" element={<NavBar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
