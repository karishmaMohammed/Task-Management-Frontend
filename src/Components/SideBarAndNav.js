import React from 'react'
import LoggedInNavPage from './HomePage/LoggedInNavPage'
import SideNavigator from './SideNavigator/SideNavigator'


function SideBarAndNav({children, setClosePopUp, closePopUp }) {
  
  const handleTogglePopUp = (e)=>{
    e.stopPropagation()
    setClosePopUp((prev)=> prev)
  }
  
  return (
    <div>
        <LoggedInNavPage/>
        <div style={{ display: 'flex' }}>
        <SideNavigator/>
        {children}
        </div>
        
    </div>
  )
}

export default SideBarAndNav
