import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendar, FaPaperclip, FaPlus, FaTimes, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom'; 
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar.jsx';
import LoadingSpinner from './Loading Style/Fill File Loading/Loader.jsx';
import ButtonSpinner from './Loading Style/Spinner Loading/ButtonSpinner.jsx';

const Project = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [team, setTeam] = useState('');
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate();
  const [doneTaskCounts, setDoneTaskCounts] = useState({});
  const { isNavOpen } = useOutletContext();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); 
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user ? user.accessToken : null;
      
        if (!accessToken) {
          setError('No access token found. Please log in again.');
          return;
        }
  
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-getnewproject`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('An error occurred while fetching projects.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);
  

  
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setImagePreview(null);
    setProjectName('');
    setTeam('');
    setError('');
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
//post request of cloudnary
  const handleSavethumbnail = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'EunivateImage');
    formData.append('cloud_name', 'dzxzc7kwb');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzxzc7kwb/image/upload',
        formData
      );
      return { publicId: response.data.public_id, url: response.data.secure_url };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleCreateProject = async () => {
    setLoading(true);
    if (!imagePreview || !projectName || !team) {
      setError('Please fill out all fields including image, project name, and team.');
      setLoading(false);
      return;
    }
  
    // Retrieve access token from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
  
    if (!accessToken) {
      setLoading(false);
      setError('No access token found. Please log in again.');
      return;
    }
  
    try {
      const thumbnail = await handleSavethumbnail(selectedImage);
      const newProject = {
        projectName,
        thumbnail,
      };
  
      // Include token in the request headers
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-newproject`, newProject, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      setProjects([...projects, response.data]);
      closeModal();
    } catch (error) {
      setLoading(false);
      console.error('Error creating project:', error);
      setError('An error occurred while creating the project.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    // Fetch done task count for each project
    const fetchDoneTaskCounts = async () => {
      try {
        const counts = {};
        for (let project of projects) {
          try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-tasks/${project._id}?status=Done`);
            counts[project._id] = response.data.data.length; // Store count of done tasks
          } catch (error) {
            // Handle errors for individual project requests (optional)
            console.error('Error fetching done task count:', error);
            counts[project._id] = 0; // Set to 0 if there is an error
          }
        }
        setDoneTaskCounts(counts);
      } catch (error) {
        console.error('Error fetching done task counts:', error);
      }
    };

    if (projects.length) {
      fetchDoneTaskCounts();
    }
  }, [projects]);


  const handleProjectClick = (project) => {
    setSelectedProject(project); // Set the selected project
    setLoadingProject(true);
    setTimeout(() => {
      navigate(`/superadmin/projects/${project._id}`, { state: { projectId: project._id } });
      setLoadingProject(false);
    }, 3000);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-newproject/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('An error occurred while deleting the project.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

{loadingProject && (
  <div className="flex flex-col items-center">
    <LoadingSpinner projectName={selectedProject ? selectedProject.projectName : ''} />
  </div>
)}



      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative">
          <h1 className={`text-2xl font-medium text-gray-800 hidden md:block ${isNavOpen ? 'hidden' : ''}`}>
            Project 
          </h1>
        </div>
        <AdminNavbar
          isAccountDropdownOpen={isAccountDropdownOpen}
          toggleAccountDropdown={toggleAccountDropdown}
        />
      </div>

      <div className="relative mt-10">
        <div className={`absolute left-4 top-4 font-semibold text-2xl transform -translate-y-1/2 text-black md:hidden ${isNavOpen ? 'hidden' : ''}`}>
          Project
        </div>
        <button
          onClick={openModal}
          className="absolute right-4 flex items-center bg-red-800 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
        >
          <FaPlus className="mr-2" />
          New Project
        </button>
      </div>

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
                <option value="" disabled>Team</option>
                <option value="team1">Super Board</option>
                <option value="team2">Team 2</option>
                <option value="team3">Team 3</option>
              </select>
            </div>


            <div className="mt-6 flex justify-center">
            <button
          onClick={handleCreateProject}
          className="bg-red-800 text-white px-8 py-3 rounded-md shadow hover:bg-red-900 w-full flex items-center justify-center"
          disabled={loading}
        >
                        {loading ? <ButtonSpinner /> : 'Create Project'}

              </button>
            </div>
          </div>
        </div>
      )}
  <div className={`mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 ${isNavOpen ? 'mt-28' : 'mt-20'}`}>
  {projects.map((project) => (
    <div
      key={project._id}
      className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-2 relative cursor-pointer w-full"
      onClick={() => handleProjectClick(project)}
    >
      {project.thumbnail && (
        <img
          src={project.thumbnail.url}
          alt={project.projectName}
          className="w-full h-32 object-cover rounded-md"
        />
      )}
      <h3 className="text-lg font-semibold mt-2">{project.projectName}</h3>
      <div className="flex items-center text-gray-500 mt-2">
        <FaCalendar className="mr-2" />
        <p>{new Date(project.createdAt).toLocaleDateString() || 'No date available'}</p>
        <FaCheckCircle className="ml-5" />
        <p className="ml-2">
          {doneTaskCounts[project._id] !== undefined ? doneTaskCounts[project._id] : 'Loading...'}
        </p>
        {/* <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            // handleDeleteProject(project._id); // Pass project ID for deletion
          }}
          className="absolute bottom-14 right-6 bg-red-600 text-white p-3 rounded-full shadow hover:bg-red-700"
          title="Delete Project"
        >
          <FaTrash size={20} />
        </button> */}
      </div>
      <div className="flex items-center mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2 relative">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: '5%' }} // Adjust this as needed
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

export default Project;