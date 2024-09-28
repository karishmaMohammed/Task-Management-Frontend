import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import RegisterAndLogin from './Components/OnBoarding/RegisterAndLogin';
import EditDetails from './Components/OnBoarding/EditDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<RegisterAndLogin type='register'/>} />
        <Route path="/login" element={<RegisterAndLogin type='login'/>} />
        <Route path="/edit-details" element={<EditDetails type='edit'/>} />
        <Route path="/change-password" element={<EditDetails type='password'/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
