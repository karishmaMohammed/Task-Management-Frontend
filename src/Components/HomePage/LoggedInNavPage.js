import React,{useState} from 'react'
import './HomePage.css';
import Notification from '../Notification/Notification';

function LoggedInNavPage() {
    const [openNotiofications,setOpenNotifications] = useState(false)
    const [notificationCount, setNotificationCount] = useState('');
    const handleMakeZero = () => {
        setNotificationCount(0);
      };
    return (
        <>
        <div className='top-nav'>
            
            <div className='user-icons'>
                <img onClick={()=>setOpenNotifications(!openNotiofications)} src='https://cdn-icons-png.freepik.com/256/5794/5794042.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid' alt=''/>
                <img src='https://icon-library.com/images/username-icon-png/username-icon-png-19.jpg' alt=''/>
                {/* <button>Signup</button>
                <button>Login</button> */}
            </div>
        </div>
        {openNotiofications && <Notification onclose={()=>setOpenNotifications(!openNotiofications)} handleMakeZero={handleMakeZero}/>}
        </>
        
    )
}

export default LoggedInNavPage