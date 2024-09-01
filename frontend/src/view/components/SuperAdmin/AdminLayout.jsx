import React from "react";
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

const AdminLayout = () => {
    return (
        <div className="flex">
            <SideNav />
            <main style={{ marginLeft: '250px', width: '100%', height: '100vh' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
