import React, { useState, useEffect } from 'react';
import { FaCalendar, FaPaperclip, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar.jsx';

const ProjectMem = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  // Toggle account dropdown
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/sa-getnewproject');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Admin Navbar */}
      <div className="w-full flex justify-between items-center">
        
      <div className="relative">
  <h1 className="text-2xl font-medium text-gray-800 hidden md:block">Project</h1>
  </div>

  <AdminNavbar
    isAccountDropdownOpen={isAccountDropdownOpen}
    toggleAccountDropdown={toggleAccountDropdown}
  />
  
</div>

    
      {/* Display Projects */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
      <div className="block md:hidden text-black text-2xl font-semibold ml-2">
                Project
            </div>
      
      </div>
    </div>
  );
};

export default ProjectMem;
