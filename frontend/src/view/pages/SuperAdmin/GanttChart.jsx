import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faImage } from '@fortawesome/free-solid-svg-icons';

const GanttChart = () => {
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const projectName = location.state?.project?.name;

  useEffect(() => {
    if (projectName) {
      const storedTasks = JSON.parse(localStorage.getItem(`kanban-${projectName}`)) || [];
      setTasks(storedTasks);
    }
  }, [projectName]);

  const getCurrentYear = () => new Date().getFullYear();

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getMonthIndex = (date) => new Date(date).getMonth();

  const calculateTaskWidth = (startDate, dueDate) => {
    const startMonthIndex = getMonthIndex(startDate);
    const endMonthIndex = getMonthIndex(dueDate);
    return ((endMonthIndex - startMonthIndex + 1) / 12) * 100;
  };

  const calculateTaskLeft = (startDate) => {
    const startMonthIndex = getMonthIndex(startDate);
    return (startMonthIndex / 12) * 100;
  };

  const getStatusIconColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-yellow-500';
      case 'Done':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-gray-500';
      case 'Todo':
        return 'bg-pink-500';
      case 'Backlogs':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Function to count images in a task
  const countImages = (task) => {
    return ['image1', 'image2'].reduce((count, imageKey) => {
      return task[imageKey] ? count + 1 : count;
    }, 0);
  };

  const allStatuses = ['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'];

  const SMALL_TEXT_THRESHOLD = 10; // percentage width

  return (
    <div className="p-4 sm:p-8 bg-white shadow-lg rounded-lg overflow-x-auto">
      <div className="relative">
        {/* Header with months */}
        <div className="flex items-center border-b border-gray-300">
          <div className="w-36 min-w-[1rem] border-r border-gray-300 p-2 text-center -ml-28"></div>
          {months.map((month) => (
            <div key={month} className="flex-1 min-w-[5%] text-center border-r border-gray-300 p-2">
              {month}
            </div>
          ))}
        </div>
        {/* Gantt chart rows */}
        <div className="overflow-x-auto">
          {allStatuses.map((status) => (
            <div key={status} className="flex items-start border-b border-gray-300 mt-16">
              <div className="w-28 min-w-[7rem] border-r border-gray-300 p-2 flex items-start -ml-20">
                <div className="transform rotate-90 ml-20 -translate-x-1/2 mb-10 text-xl font-semibold relative translate-y-[-0.5rem]">
                  {status}
                </div>
              </div>
              <div className="relative flex-1">
                {tasks
                  .filter(task => (status === 'Document' && task.status === 'Pending') || task.status === status)
                  .map((task) => {
                    const taskWidth = calculateTaskWidth(task.startDate, task.dueDate);
                    const textSizeClass = taskWidth < SMALL_TEXT_THRESHOLD ? 'text-xs' : 'text-sm';
                    const imageCount = countImages(task);
                    return (
                      <div
                        key={task.id}
                        className={`absolute ${getStatusIconColor(task.status)} text-white p-2 rounded`}
                        style={{
                          width: `${taskWidth}%`,
                          left: `${calculateTaskLeft(task.startDate)}%`,
                          whiteSpace: 'nowrap',
                          top: '50%', // Adjust this value to move the task name up or down
                          transform: 'translateY(-50%)', // Center vertically
                        }}
                      >
                        <div className={`text-black ${textSizeClass}`}>
                          {task.taskName}
                          {imageCount > 0 && (
                            <div className="flex items-center mt-1 text-xs">
                              <FontAwesomeIcon
                                icon={faImage}
                                className="mr-1 text-gray-700"
                              />
                              <span>{imageCount} {imageCount === 1 ? 'Image' : 'Images'}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center mt-1 text-xs">
                          <FontAwesomeIcon
                            icon={faFlag}
                            className={`mr-1 ${getDifficultyColor(task.difficulty)}`}
                          />
                          <span className="px-2 py-1 text-black">
                            {task.difficulty}
                          </span>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
