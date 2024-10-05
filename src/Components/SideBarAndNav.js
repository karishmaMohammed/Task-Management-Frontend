import React from 'react'
import LoggedInNavPage from './HomePage/LoggedInNavPage'
import SideNavigator from './SideNavigator/SideNavigator'


function SideBarAndNav({children}) {
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
