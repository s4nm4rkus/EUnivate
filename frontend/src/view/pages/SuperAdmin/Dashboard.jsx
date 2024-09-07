import React, { useState, useEffect } from 'react';
import { i1, i2, i3, i4 } from '../../../constants/assets';
import { FaCalendarAlt } from 'react-icons/fa'; // Import calendar icon
import '../../../admin.css';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';

const Dashboard = () => {
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [projectCount, setProjectCount] = useState(0);
    const [projects, setProjects] = useState([]); // State to manage the list of projects

    useEffect(() => {
        // Fetch project count and list from local storage
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
        setProjectCount(storedProjects.length);
    }, []);

    const toggleProjectDropdown = () => setIsProjectDropdownOpen(!isProjectDropdownOpen);
    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1>
                <AdminNavbar
                    isAccountDropdownOpen={isAccountDropdownOpen}
                    toggleAccountDropdown={toggleAccountDropdown}
                />
            </div>

            {/* Project Dropdown */}
            <div className="relative mb-6">
                <button
                    onClick={toggleProjectDropdown}
                    className="relative flex items-center h-12 w-56 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm"
                >
                    <span className="text-sm font-medium">Projects</span>
                    {/* Icon positioned at the right end */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`absolute right-4 w-5 h-5 transform transition-transform duration-300 ${isProjectDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
                {/* Project Dropdown Menu */}
                <div className={`absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg ${isProjectDropdownOpen ? 'block' : 'hidden'}`}>
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <a
                                key={index}
                                href={`/project/${project.id}`} // Assuming each project has a unique ID and you use it for navigation
                                className="block px-6 py-3 text-gray-800 hover:bg-gray-100"
                            >
                                {project.name}
                            </a>
                        ))
                    ) : (
                        <p className="px-6 py-3 text-gray-500">No projects available</p>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex space-x-4 mb-6">
                {/* Task Divs */}
                {[
                    { title: "Assigned Task", icon: i1, count: projectCount },
                    { title: "Task Complete", icon: i2 },
                    { title: "Objective Complete", icon: i3 },
                    { title: "Project Complete", icon: i4 }
                ].map(({ title, icon, count }, index) => (
                    <div
                        key={index}
                        className="flex-1 bg-white p-4 border border-gray-300 rounded-lg shadow-sm flex items-center"
                        style={{
                            backgroundImage: `url(${icon})`,
                            backgroundSize: '40px 40px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '18px center'
                        }}
                    >
                        {/* Text and Number */}
                        <div className="ml-16">
                            <div className="text-gray-800 font-semibold mb-1 text-sm">{title}</div>
                            <div className="text-3xl font-bold">{count || 0}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Today Task and Activity Titles */}
            <div className="flex justify-between mb-2">
                <h2 className="text-medium font-semibold text-gray-800">Today Task</h2>
                <h2 className="text-medium font-semibold text-gray-800">Activity</h2>
            </div>

            {/* Today Task and Activity Divs */}
            <div className="flex space-x-4 mb-6">
                <div className="w-3/5 bg-white p-4 border border-gray-300 rounded-lg shadow-sm today-task-div">
                    <p>Content for Today Task goes here...</p>
                </div>
                {/* Activity Div */}
                <div className="w-2/5 h-72 bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
                    <p>Content for Activity goes here...</p>
                </div>
            </div>

            {/* Ongoing Projects */}
            <div className=" flex flex-col">
                <h2 className="text-medium font-semibold text-gray-800 mb-2">Ongoing Projects</h2>
                <div className=" ongoing-projects">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div key={index} className="bg-white p-4 border border-gray-200 rounded-md shadow-md mb-4 flex items-center space-x-4">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                )}
                                <div>
                                    <p className="text-gray-800 font-semibold">{project.name}.App</p>
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <FaCalendarAlt className="w-4 h-4" />
                                        <p>{project.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No ongoing projects</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
