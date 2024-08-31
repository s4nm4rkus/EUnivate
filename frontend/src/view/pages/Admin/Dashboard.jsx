import React, { useState } from 'react';
import { i1, i2, i3, i4 } from '../../../constants/assets';
import '../../../admin.css';
import AdminNavbar from '../../components/Admin/AdminNavbar';
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
                <div className="w-3/5 bg-white p-4 border border-gray-300 rounded-lg shadow-sm today-task-div">
                    <p>Content for Today Task goes here...</p>
                </div>
                <div className="w-2/5 h-72 bg-white p-4 border border-gray-300 rounded-lg shadow-sm">
                    <p>Content for Activity goes here...</p>
                </div>
            </div>

            {/* Ongoing Projects Title and Div */}
            <div className="w-2/5 flex flex-col projects-div">
                <h2 className="text-medium font-semibold text-gray-800 mb-2">Ongoing Project</h2>
                <div className="w-full bg-white p-4 border border-gray-300 rounded-lg shadow-sm h-72 ongoing-projects">
                    <p>Content for Ongoing Projects goes here...</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
