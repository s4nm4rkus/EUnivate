import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaFlag } from 'react-icons/fa';

const List = () => {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const projectName = location.state?.project?.name;

  useEffect(() => {
    if (projectName) {
      // Load tasks for the specific project from local storage
      const storedTasks = JSON.parse(localStorage.getItem(`kanban-${projectName}`)) || [];
      setTasks(storedTasks);
    }
  }, [projectName]);

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status || (status === 'Document' && task.status === 'Pending'));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'text-black-500';
      case 'Done':
        return 'text-black-500';
      case 'Pending':
        return 'text-black-500';
      case 'Todo':
        return 'text-black-500';
      case 'Backlogs':
        return 'text-black-500';
      default:
        return 'text-black-500';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-500';
      case 'Medium':
        return 'text-orange-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-4">
      {['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'].map((status) => (
        <div key={status} className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{status}</h2>
          {getTasksByStatus(status).length > 0 ? (
            getTasksByStatus(status).map((task) => (
              <div key={task.id} className="border p-4 mb-4 rounded bg-white shadow-md grid grid-cols-6 gap-4 items-start">
                <div>
                  <p className="text-xs text-gray-400 mb-4">Task</p>
                  <h3 className="text-lg font-semibold">{task.taskName}</h3>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-5">DueDate</p>
                  <p className="text-sm">
                    {task.dueDate ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(task.dueDate)) : 'No due date'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-4">Priority</p>
                  <div className="flex items-center">
                    <FaFlag className={`${getDifficultyColor(task.difficulty)} mr-2`} />
                    <span className="text-sm">{task.difficulty}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-4">Objective</p>
                  <p className="text-sm">{task.objective}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-4">Status</p>
                  <p className={`text-sm ${getStatusColor(task.status)}`}>{task.status}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-4">Assigned</p>
                  <div className="flex items-center">
                    {task.selectedAvatar ? (
                      <img
                        src={task.selectedAvatar}
                        alt="Selected User Avatar"
                        className="w-7 h-7 rounded-full object-cover mr-2"
                      />
                    ) : (
                      <img
                        src="/path/to/default/avatar.png"
                        alt="Default Avatar"
                        className="w-7 h-7 rounded-full object-cover mr-2"
                      />
                    )}
                    <p className="">{task.assignee}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available for this status.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
