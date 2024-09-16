import React from 'react'
import { Outlet } from "react-router-dom";
import MemberSidebar from "./MemberLayout"; 

const Member = () => {
  return (
    <div className="flex">
    <MemberSidebar />
    <main style={{ marginLeft: '250px', width: '100%', height: '100vh' }}>
                <Outlet />
            </main>
  </div>
  )
}

export default Member