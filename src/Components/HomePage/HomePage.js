import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";

function HomePage() {
  const nav = useNavigate();

  const handleLogout = () => {
    // Clear the token from cookies
    Cookies.remove('user_token');
    
    // Optional: Clear local storage if you are using local storage as well
    // localStorage.clear();

    // Redirect to the login page after logout
    nav('/login');
  };
  return (
    <div>
         <button onClick={()=>nav('/signup')}>Sign up</button>
         <button onClick={()=>nav('/login')}>Login</button>
         <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default HomePage
