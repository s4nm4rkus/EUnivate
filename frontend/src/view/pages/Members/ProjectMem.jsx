import React, { useState, useEffect } from 'react';
import { FaCalendar, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar.jsx';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle project click navigation

const ProjectMem = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskCounts, setTaskCounts] = useState({});
  const [loadingProject, setLoadingProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate for project navigation

  // Toggle account dropdown
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  // Fetch projects
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

        // Fetch projects where the member is invited
        const response = await axios.get('http://localhost:5000/api/users/sa-getnewproject', {
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

  // Fetch task counts (total and done) for each project
  useEffect(() => {
    const fetchTaskCounts = async () => {
      const counts = {};
      for (let project of projects) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/sa-tasks/${project._id}`);
          const totalTasks = response.data.data.length;
          const doneTasks = response.data.data.filter(task => task.status === 'Done').length;
          counts[project._id] = {
            totalTasks,
            doneTasks,
          };
        } catch (error) {
          console.error('Error fetching task counts:', error);
        }
      }
      setTaskCounts(counts);
    };

    if (projects.length) {
      fetchTaskCounts();
    }
  }, [projects]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setLoadingProject(true);
    setTimeout(() => {
      navigate(`/member/projects/${project._id}`, { state: { projectId: project._id } });
      setLoadingProject(false);
    }, 2000); // Adjust timeout as needed
  };

  const calculateProgress = (projectId) => {
    const { totalTasks, doneTasks } = taskCounts[projectId] || { totalTasks: 0, doneTasks: 0 };
    return totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;
  };

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
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {error && <p className="text-red-500">{error}</p>}
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-4 rounded-md shadow-md border border-gray-200 mt-2 relative cursor-pointer"
              onClick={() => handleProjectClick(project)} // Navigate to project details
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
                <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                <FaCheckCircle className="ml-5" />
                <p className="ml-2">
                  {taskCounts[project._id] ? taskCounts[project._id].doneTasks : 'Loading...'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 relative">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${calculateProgress(project._id)}%` }} // Dynamically set progress width
                  ></div>
                </div>
                <p className="ml-2 text-gray-500">
                  {`${Math.floor(calculateProgress(project._id))}%`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects available for this user.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectMem;
