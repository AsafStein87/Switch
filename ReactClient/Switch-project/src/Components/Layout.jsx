import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  const userLogIn = localStorage.getItem("factoryName");

  return (
    <>
    {/* {userLogIn? <div></div>:<Navbar/>}  */}
    <Navbar factoryName={userLogIn}/>
    
    <main>  
        <Outlet/>
    </main>
   
    </>
  )
}
