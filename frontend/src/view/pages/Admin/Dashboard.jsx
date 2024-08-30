import React from "react";
import { Outlet, Link } from "react-router-dom";
import { dashboard_logo, dashboard_sidenav_icon } from "../../../constants/assets";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* SideNav component */}
            <div className="side-nav-admin" style={{ width: '250px' }}>
                <div className="dashboard-logo flex" style={{ padding: '10px' }}>
                    <img
                        src={dashboard_logo}
                        alt="EUnivate Logo"
                        style={{ height: "20px", marginRight: '10px' }}
                    />
                    <h2 style={{ margin: 0 }}>EUnivate</h2>
                </div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li>
                        <Link to="dashboard" className="nav-item-dashboard" style={{ display: "flex", alignItems: 'center', padding: '10px' }}>
                            <img src={dashboard_sidenav_icon} alt="Dashboard Icon" style={{ height: '16px', marginRight: '10px' }} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="project" style={{ padding: '10px', display: 'block' }}>Project</Link>
                    </li>
                    <li>
                        <Link to="task" style={{ padding: '10px', display: 'block' }}>My Task</Link>
                    </li>
                    <li>
                        <Link to="people" style={{ padding: '10px', display: 'block' }}>People</Link>
                    </li>
                    <li>
                        <Link to="messages" style={{ padding: '10px', display: 'block' }}>Messages</Link>
                    </li>
                    <li>
                        <Link to="settings" style={{ padding: '10px', display: 'block' }}>Settings</Link>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <main style={{ marginLeft: '250px', padding: '20px', width: '100%', height: '100vh' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
