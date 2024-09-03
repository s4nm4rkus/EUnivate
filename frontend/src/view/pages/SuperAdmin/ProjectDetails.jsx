import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate and useLocation from react-router-dom
import '../../../admin.css';
import AdminNavbar from '../../components/SuperAdmin/adminNavbar';

const ProjectDetails = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const project = location.state?.project || {}; // Retrieve project data from location state

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-medium text-gray-800">Project Details</h1>
                <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} 
                />
            </div>

            <div className="bg-white p-4 rounded-md shadow-md border border-gray-200 mb-8"> {/* Increased bottom margin */}
                {/* Flex container for the image and details */}
                <div className="flex items-start space-x-4 mb-4"> {/* Changed items-center to items-start */}
                    {/* Display Image */}
                    {project.image && (
                        <div className="w-24 h-24 flex-shrink-0"> {/* Prevent image from shrinking */}
                            <img 
                                src={project.image} 
                                alt={project.name} 
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    )}

                    {/* Flex container for the details */}
                    <div className="flex flex-col flex-grow">
                        {/* Navigation Links */}
                        <div className="flex items-center space-x-4 mb-5">
                            <button
                                onClick={() => navigate(-1)} // Go back to the previous page
                                className="text-gray-500 hover:underline"
                            >
                                Project
                            </button>
                            <span className="text-gray-500">/</span>
                            <span className="text-gray-500">Detail</span>
                        </div>

                        {/* Project Name with .App */}
                        <h2 className="text-3xl font-semibold mt-[-1rem]">{project.name}.App</h2> {/* Adjusted margin-top */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
