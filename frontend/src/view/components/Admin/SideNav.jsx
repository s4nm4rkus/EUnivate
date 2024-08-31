import React from "react";
import { Link } from 'react-router-dom';
import { 
    dashboard_logo, 
    dashboard_sidenav_icon, 
    activity_red, 
    dashboard_red, 
    messages_red, 
    people_red, 
    project_red, 
    settings_red, 
    task_red,
    activity_icon,
    messages_icon,
    people_icon,
    project_icon,
    settings_icon,
    task_icon
} from "../../../constants/assets";

const SideNav = () => {
    return (
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
                <li className="mb-2">
                    <Link to="dashboard" className="nav-item-dashboard group relative flex items-center p-2">
                        <img 
                            src={dashboard_sidenav_icon} 
                            alt="Dashboard Icon" 
                            className="absolute h-4 group-hover:hidden" 
                        />
                        <img 
                            src={dashboard_red} 
                            alt="Dashboard Icon Red" 
                            className="absolute h-5 hidden group-hover:block -translate-y-1" 
                        />
                        <span className="ml-10">Dashboard</span>
                    </Link>
                </li>

                <li className="mb-2">
    <Link to="project" className="nav-item-dashboard group relative flex items-center p-2">
        <img 
            src={project_icon} 
            alt="Project Icon" 
            className="absolute h-5 group-hover:hidden" 
        />
        <img 
            src={project_red} 
            alt="Project Icon Red" 
            className="absolute h-5 hidden group-hover:block -translate-y-1" 
        />
        <span className="ml-10 translate-y-1">Project</span>
    </Link>
</li>


                <li className="mb-2">
                    <Link to="task" className="nav-item-dashboard group relative flex items-center p-2">
                        <img 
                            src={task_icon} 
                            alt="Task Icon" 
                            className="absolute h-5 group-hover:hidden" 
                        />
                        <img 
                            src={task_red} 
                            alt="Task Icon Red" 
                            className="absolute h-5 hidden group-hover:block -translate-y-1" 
                        />
                        <span className="ml-10 translate-y-1">My Task</span>
                    </Link>
                </li>

                <li className="mb-2">
                    <Link to="activity" className="nav-item-dashboard group relative flex items-center p-2">
                        <img 
                            src={activity_icon} 
                            alt="Activity Icon" 
                            className="absolute h-5 group-hover:hidden" 
                        />
                        <img 
                            src={activity_red} 
                            alt="Activity Icon Red" 
                            className="absolute h-5 hidden group-hover:block -translate-y-1" 
                        />
                        <span className="ml-10 translate-y-1">Activity</span>
                    </Link>
                </li>

                <li className="mb-2">
                    <Link to="people" className="nav-item-dashboard group relative flex items-center p-2">
                        <img 
                            src={people_icon} 
                            alt="People Icon" 
                            className="absolute h-5 group-hover:hidden" 
                        />
                        <img 
                            src={people_red} 
                            alt="People Icon Red" 
                            className="absolute h-5 hidden group-hover:block -translate-y-1" 
                        />
                        <span className="ml-10 translate-y-1">People</span>
                    </Link>
                </li>

                <li className="mb-2">
                    <Link to="messages" className="nav-item-dashboard group relative flex items-center p-2">
                        <img 
                            src={messages_icon} 
                            alt="Messages Icon" 
                            className="absolute h-5 group-hover:hidden" 
                        />
                        <img 
                            src={messages_red} 
                            alt="Messages Icon Red" 
                            className="absolute h-5 hidden group-hover:block -translate-y-1" 
                        />
                        <span className="ml-10 translate-y-1">Messages</span>
                    </Link>
                </li>

                <li className="mb-2">
                    <Link to="settings" className="nav-item-dashboard group relative flex items-center p-2">
                        <img 
                            src={settings_icon} 
                            alt="Settings Icon" 
                            className="absolute h-5 group-hover:hidden" 
                        />
                        <img 
                            src={settings_red} 
                            alt="Settings Icon Red" 
                            className="absolute h-5 hidden group-hover:block -translate-y-1" 
                        />
                        <span className="ml-10 translate-y-1">Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideNav;
