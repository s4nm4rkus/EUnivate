import React, { useState, useEffect, useRef } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar.jsx';
import Kanban from './Kanban';
import List from './List';
import Calendar from './Calendar';
import GanttChart from './GanttChart';
import RaciMatrix from './RaciMatrix';

const ProjectDetails = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [selectedView, setSelectedView] = useState('Kanban');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]); 
    const [addedMembers, setAddedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [addText, setAddText] = useState('');
    const [project, setProject] = useState({});
    const modalRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const projectId = location.state?.projectId;

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-getnewproject/${projectId}`);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        if (projectId) {
            fetchProjectDetails();
        }
    }, [projectId]);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUserIconClick = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/members-superadmins`);
            setMembers(response.data);
            setIsUserModalOpen(true);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

        const toggleMemberSelection = (member) => {
            setSelectedMembers(prevSelectedMembers => 
                prevSelectedMembers.some(selected => selected._id === member._id)
                    ? prevSelectedMembers.filter(selected => selected._id !== member._id)
                    : [...prevSelectedMembers, member]
            );
        };

        const handleAddMembers = () => {
            setAddedMembers([...addedMembers, ...selectedMembers]); 
            setSelectedMembers([]);
            setIsUserModalOpen(false); 
        };
    

    const handleCloseUserModal = () => {
        setIsUserModalOpen(false);
    };

    const handleButtonTextUpdate = (text) => {
        setAddText(text);
        handleCloseModal();
        if (text === 'Gantt Chart') {
            setSelectedView('GanttChart');
        } else if (text === 'RACI Matrix') {
            setSelectedView('RaciMatrix');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredMembers = members.filter(member => 
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen p-6">
               <div className="w-full flex justify-between items-center mb-16">
      <div className="relative">
    <h1 className="text-2xl font-medium text-gray-800 hidden md:block">
        Project Details 
    </h1>
</div>
        <AdminNavbar
          isAccountDropdownOpen={isAccountDropdownOpen}
          toggleAccountDropdown={toggleAccountDropdown}
        />
      </div>

            <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
                <div className="flex items-start space-x-4">
                    {project.thumbnail && (
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                src={project.thumbnail.url} 
                                alt={project.projectName} 
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    )}

                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center space-x-4 mb-5">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-500 hover:underline"
                            >
                                Project
                            </button>
                            <span className="text-gray-500">/</span>
                            <span className="text-gray-500">Detail</span>
                        </div>

                        <div className="relative flex items-center space-x-4">
                            <h2 className="text-3xl font-semibold mt-[-1rem]">
                                {project.projectName}
                            </h2>
                            <FontAwesomeIcon 
                                icon={faUserPlus} 
                                className="cursor-pointer mt-[-1rem]" 
                                size="lg" 
                                onClick={handleUserIconClick}
                            />
                            {/* Updated section for added users */}
                            <div className="flex -space-x-4  right-0">
                                {addedMembers.map(member => (
                                    <img
                                    key={member._id}
                                    src={member.profilePicture} // Assuming profilePicture is available
                                    alt={member.username}
                                    className="w-8 h-8 rounded-full border border-gray-300"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                onClick={() => handleViewChange('Kanban')}
                                className="text-black hover:text-gray-700"
                            >
                                Kanban
                            </button>
                            <button
                                onClick={() => handleViewChange('List')}
                                className="text-black hover:text-gray-700"
                            >
                                List
                            </button>

                            <button
                                onClick={() => handleViewChange('Calendar')}
                                className="text-black hover:text-gray-700"
                            >
                                Calendar
                            </button>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleAddClick}
                                    className="text-black hover:text-gray-700"
                                >
                                    + Add
                                </button>
                                {addText && (
                                    <span className="text-black font-bold">
                                        {addText}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-gray-200">
                {selectedView === 'Kanban' && <Kanban projectId={projectId} projectName={project.projectName} />}
                {selectedView === 'List' && <List projectId={projectId} />}
                {selectedView === 'Calendar' && <Calendar project={project} />}
                {selectedView === 'GanttChart' && <GanttChart projectId={projectId} />}
                {selectedView === 'RaciMatrix' && <RaciMatrix projectId={projectId} />}
            </div>

             {/* Modal for adding new members */}
             {isUserModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-md shadow-lg border border-gray-200 w-1/3">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
                            onClick={handleCloseUserModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
                        
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search by email..."
                                className="flex-grow p-2 border border-gray-300 rounded-md"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                            <button
                                className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={handleAddMembers}
                            >
                                Add Member
                            </button>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold mb-2 text-red-800">Members</h3>
                            {filteredMembers.length > 0 ? (
                               <ul>
                               {filteredMembers.map((member) => (
                                 <li
                                   key={member._id}
                                   className={`flex justify-between items-center py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                                     selectedMembers.some(selected => selected._id === member._id) ? 'bg-gray-300' : ''
                                   }`}
                                   onClick={() => toggleMemberSelection(member)}
                                 >
                                   <div className="flex items-center space-x-2">
                                     <img
                                       src={member.profilePicture}
                                       alt={member.username}
                                       className="w-8 h-8 rounded-full"
                                     />
                                     <span>{member.username}</span>
                                   </div>
                                   <span>{member.email}</span>
                                   {selectedMembers.some(selected => selected._id === member._id) && (
                                     <span className="text-red-500 font-bold">Selected</span>
                                   )}
                                 </li>
                               ))}
                             </ul>
                            ) : (
                                <p>No members found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;

