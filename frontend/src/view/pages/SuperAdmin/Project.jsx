import React, { useState, useEffect } from 'react';
import { FaCalendar, FaPaperclip, FaPlus, FaTimes, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import AdminNavbar from '../../components/SuperAdmin/adminNavbar';

const Project = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [projectName, setProjectName] = useState('');
    const [team, setTeam] = useState('');
    const [projects, setProjects] = useState([]); // State for managing the list of projects
    const [error, setError] = useState(''); // State to manage error messages

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Load projects from local storage when component mounts
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setProjects(storedProjects);
    }, []);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
        setImagePreview(null);
        setProjectName('');
        setTeam('');
        setError(''); // Clear any errors when the modal is closed
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits
        const day = d.getDate().toString().padStart(2, '0'); // Ensure two digits
        const year = d.getFullYear().toString().slice(-2); // Get last two digits of the year
        return `${month}-${day}-${year}`;
    };

    // This part remains the same in your Project component
    const handleCreateProject = () => {
        if (!imagePreview || !projectName || !team) {
            setError('Please fill out all fields including image, project name, and team.');
            return;
        }
    
        const newProject = {
            name: projectName,
            image: imagePreview,
            date: formatDate(new Date()),
            progress: 5 // Set a default progress value, adjust as needed
        };
    
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
        closeModal();
    };
    

const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
};


    const handleProjectClick = (project) => {
        navigate(`/superadmin/projects/${project.name}`, { state: { project } });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 relative">
            {/* Admin Navbar */}
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-2xl font-medium text-gray-800">Project</h1>
                <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} 
                />
            </div>

            {/* Main Content */}
            <div className="relative mt-10">
                <button 
                    onClick={openModal} 
                    className="absolute right-4 flex items-center bg-red-800 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
                >
                    <FaPlus className="mr-2" />
                    New Project
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-lg relative max-w-md mx-auto w-full z-60">
                        <button 
                            onClick={closeModal} 
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-xl font-semibold">New Project</h2>
                        <p className="mt-4 text-gray-500">Thumbnail</p>
                        <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-md flex items-center">
                            <div className="flex-shrink-0 mr-4">
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <div className={`w-20 h-20 ${imagePreview ? 'bg-transparent' : 'bg-gray-200'} border-2 border-gray-300 rounded-md flex items-center justify-center`}>
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Thumbnail Preview" className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <FaPlus size={20} className="text-gray-600" />
                                        )}
                                    </div>
                                    <input 
                                        id="file-upload"
                                        type="file" 
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            <p className="text-gray-500">Click to upload a thumbnail</p>
                        </div>
                        <p className="mt-4 text-gray-500 text-left">Project Name</p>
                        <input 
                            type="text" 
                            placeholder="Enter project name" 
                            className="mt-2 w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <p className="mt-4 text-gray-500 text-left">Team</p>
                        <div className="relative mt-2">
                            <select 
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                            >
                                <option value="" disabled>Select a team</option>
                                <option value="team1">Team 1</option>
                                <option value="team2">Team 2</option>
                                <option value="team3">Team 3</option>
                            </select>
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 mt-4">{error}</p>}

                        {/* Bottom button */}
                        <div className="mt-6 flex justify-center">
                            <button 
                                onClick={handleCreateProject} 
                                className="bg-red-800 text-white px-8 py-3 rounded-md shadow hover:bg-red-900 w-full"
                            >
                                Create Project
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display Projects */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <div 
                        key={index} 
                        className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-4 relative cursor-pointer"
                        onClick={() => handleProjectClick(project)}
                    >
                        {project.image && (
                            <img 
                                src={project.image} 
                                alt={project.name} 
                                className="w-full h-32 object-cover rounded-md"
                            />
                        )}
                        <h3 className="text-lg font-semibold mt-2">{project.name}</h3>
                        <div className="flex items-center text-gray-500 mt-2">
                            <FaCalendar className="mr-2" />
                            <p>{project.date}</p>
                            <FaPaperclip className="ml-5" />
                            <p className="ml-2">0</p>
                            <FaCheckCircle className="ml-5" />
                            <p className="ml-2">0</p>
                            {/* Delete Button */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent event from bubbling up
                                    handleDeleteProject(index);
                                }} 
                                className="absolute bottom-14 right-6 bg-red-600 text-white p-3 rounded-full shadow hover:bg-red-700"
                            title="Delete Project"
                        >
                            <FaTrash size={20} />
                        </button>
                        </div>
                        {/* Progress Bar with Percentage */}
                        <div className="flex items-center mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2 relative">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div> {/* Progress bar with 5% width */}
                            </div>
                            <p className="ml-2 text-gray-500">5%</p> {/* Percentage value with margin */}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Project;
