import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/SuperAdmin/adminNavbar';
import Kanban from './Kanban';
import List from './List';
import Calendar from './Calendar';
import GanttChart from './GanttChart';
import RaciMatrix from './RaciMatrix';

const ProjectDetails = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [selectedView, setSelectedView] = useState('Kanban');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addText, setAddText] = useState('');
    const modalRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const project = location.state?.project || {};

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

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-medium text-gray-800">Project Details</h1>
                <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} 
                />
            </div>

            <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
                <div className="flex items-start space-x-4">
                    {project.image && (
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                src={project.image} 
                                alt={project.name} 
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

                        <h2 className="text-3xl font-semibold mt-[-1rem]">{project.name}.App</h2>

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

            <div className="mt-6  border-gray-200">
                {selectedView === 'Kanban' && <Kanban projectName={project.name} />}
                {selectedView === 'List' && <List />}
                {selectedView === 'Calendar' && <Calendar project={project} />}
                {selectedView === 'GanttChart' && <GanttChart />}
                {selectedView === 'RaciMatrix' && <RaciMatrix />}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-md shadow-lg border border-gray-200"
                    >
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleButtonTextUpdate('Gantt Chart')}
                                className="bg-orange-100 text-orange-600 px-4 py-2 rounded-md"
                            >
                                Gantt Chart
                            </button>
                            <button
                                onClick={() => handleButtonTextUpdate('RACI Matrix')}
                                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md"
                            >
                                RACI Matrix
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
