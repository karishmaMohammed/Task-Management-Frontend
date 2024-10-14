import { toast } from "react-toastify";
import Cookies from "js-cookie";

const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true,
  };

  
export const handleNavigation = (nav) => {
    const token = Cookies.get("user_task_token");
    if(token){
      nav("/task-form");
    }else{
      toast.error('Please login', toastStyle);
      nav('/');
    }
   
  }