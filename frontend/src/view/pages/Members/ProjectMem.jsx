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
   
    </div>
  );
};

export default ProjectMem;
