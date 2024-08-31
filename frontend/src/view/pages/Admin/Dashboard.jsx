import React, { useState } from 'react';
import { i1, i2, i3, i4 } from '../../../constants/assets';
import '../../../admin.css';
import AdminNavbar from '../../components/Admin/adminNavbar';
const Dashboard = () => {
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const toggleProjectDropdown = () => setIsProjectDropdownOpen(!isProjectDropdownOpen);
    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  

    return (
        <div className="bg-gray-100 min-h-screen p-6">
              {/* Dashboard Text */}
              <div className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-medium text-gray-800 flxex">Dashboard</h1>
        <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} />
        
      </div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                {/* Dashboard Text */}
                <div className="relative">
                    <h1 className="text-2xl font-medium text-gray-800">Dashboard</h1>

                    {/* Project Dropdown */}
                    <div className="relative mt-2">
                        <button
                            onClick={toggleProjectDropdown}
                            className="flex items-center mt-6 h-7 w-40 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm"
                        >
                            <span className="mr-16 mb-1 text-sm font-medium">Projects</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 transform transition-transform duration-300 ${isProjectDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
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
                        <div className={`absolute left-0 mt-2 w-54 bg-white border border-gray-300 rounded-lg shadow-lg ${isProjectDropdownOpen ? 'block' : 'hidden'}`}>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Bookum App</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">SWYFT</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sunstone</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Kobil</a>
                        </div>
                    </div>
                </div>

                {/* Search Bar and Account Dropdown */}
                <div className="flex items-center space-x-4 mb-12">
                    {/* Search Bar with Icon */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="pl-10 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 21l-4.35-4.35M19 10a9 9 0 1 0-9 9 9 9 0 0 0 9-9z" />
                        </svg>
                    </div>

                    {/* Account Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleAccountDropdown}
                            className="flex items-center p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800"
                        >
                            <span className="mr-2">Account</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 transform transition-transform duration-300 ${isAccountDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
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
                        {/* Account Dropdown Menu */}
                        <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg ${isAccountDropdownOpen ? 'block' : 'hidden'}`}>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex space-x-4 mb-6">
                {[
                    { title: "Assigned Task", icon: i1 },
                    { title: "Task Complete", icon: i2 },
                    { title: "Objective Complete", icon: i3 },
                    { title: "Project Complete", icon: i4 }
                ].map(({ title, icon }, index) => (
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
                        <div className="ml-16">
                            <div className="text-gray-800 font-semibold mb-1 text-sm">{title}</div>
                            <div className="text-3xl font-bold">{0}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Today Task and Activity Titles */}
            <div className="flex justify-between mb-2">
                <h2 className="text-medium font-semibold text-gray-800">Today Task</h2>
                <h2 className="text-medium font-semibold text-gray-800 activity-title">Activity</h2>
            </div>

            {/* Today Task and Activity Divs */}
            <div className="flex space-x-4 mb-6">
                {/* Today Task Div */}
                <div className="w-3/5 bg-white p-4 border border-gray-300 rounded-lg shadow-sm today-task-div">
                    {/* Content for Today Task */}
                    <p>Content for Today Task goes here...</p>
                </div>
                {/* Activity Div */}
                <div className="w-2/5 h-72 bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
                    {/* Content for Activity */}
                    <p>Content for Activity goes here...</p>
                </div>
            </div>

            {/* Ongoing Projects Title and Div */}
            <div className="w-2/5 flex flex-col projects-div">
                <h2 className="text-medium font-semibold text-gray-800 mb-2">Ongoing Project</h2>
                <div className="w-full bg-white p-4 border border-gray-300 rounded-lg shadow-sm h-72 ongoing-projects">
                    {/* Content for Ongoing Projects */}
                    <p>Content for Ongoing Projects goes here...</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
