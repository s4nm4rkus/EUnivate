import React from 'react';
import { FaCalendar, FaPaperclip, FaPlus, FaTimes, FaCheckCircle, FaTrash } from 'react-icons/fa';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar.jsx';

const ProjectMem = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      {/* Admin Navbar */}
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Project</h1>
        <AdminNavbar />
      </div>


   


      {/* Display Projects */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-4 relative cursor-pointer"
          >
            <img
              src="https://via.placeholder.com/400"
              alt="Project"
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">Project Name</h3>
            <div className="flex items-center text-gray-500 mt-2">
              <FaCalendar className="mr-2" />
              <p>01-01-24</p>
              <FaPaperclip className="ml-5" />
              <p className="ml-2">0</p>
              <FaCheckCircle className="ml-5" />
              <p className="ml-2">0</p>
              <button
                className="absolute bottom-14 right-6 bg-red-600 text-white p-3 rounded-full shadow hover:bg-red-700"
                title="Delete Project"
              >
                <FaTrash size={20} />
              </button>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2 relative">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: '5%' }}
                ></div>
              </div>
              <p className="ml-2 text-gray-500">5%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectMem;
