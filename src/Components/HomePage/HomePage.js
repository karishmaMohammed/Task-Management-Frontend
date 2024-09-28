import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const nav = useNavigate()
  return (
    <div>
         <button onClick={()=>nav('/signup')}>Sign up</button>
         <button onClick={()=>nav('/login')}>Login</button>
    </div>
  )
}

export default HomePage
