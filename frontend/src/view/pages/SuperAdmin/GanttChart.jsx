import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios for fetching data
import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns';

const GanttChart = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // Week starts on Monday
  const location = useLocation();
  const projectName = location.state?.project?.name;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/sa-tasks/${projectId}`);
        setTasks(response.data.data); // Set tasks fetched from the backend
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (projectId) {
      fetchTasks();
    } else if (projectName) {
      const storedTasks = JSON.parse(localStorage.getItem(`kanban-${projectName}`)) || [];
      setTasks(storedTasks);
    }
  }, [projectId, projectName]);

  const handleNextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  const handlePrevWeek = () => setCurrentWeekStart(subWeeks(currentWeekStart, 1));

  const getDaysOfCurrentWeek = (start) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(format(addDays(start, i), 'EEE dd')); // 'EEE' gives three-letter abbreviation (Mon, Tue, etc.)
    }
    return days;
  };

  const daysOfCurrentWeek = getDaysOfCurrentWeek(currentWeekStart);

  const getDaysDifference = (startDate, dueDate) => {
    const diffTime = Math.abs(new Date(dueDate) - new Date(startDate));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
  };

  const calculateTaskLeft = (startDate) => {
    const weekStart = startOfWeek(currentWeekStart, { weekStartsOn: 1 });
    const daysFromWeekStart = Math.floor((new Date(startDate) - weekStart) / (1000 * 60 * 60 * 24));
    return daysFromWeekStart > 0 ? (daysFromWeekStart / 7) * 100 : 0;
  };

  const calculateTaskWidth = (startDate, dueDate) => {
    const totalDaysInWeek = 7;
    const weekEnd = addDays(currentWeekStart, totalDaysInWeek);

    if (new Date(dueDate) < currentWeekStart || new Date(startDate) > weekEnd) {
      return 0; // Task is outside the current week
    }

    const taskStart = Math.max(new Date(startDate), currentWeekStart);
    const taskEnd = Math.min(new Date(dueDate), weekEnd);
    const taskDurationWithinWeek = getDaysDifference(taskStart, taskEnd);
    return (taskDurationWithinWeek / totalDaysInWeek) * 100;
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

  const countImages = (task) => {
    return ['image1', 'image2'].reduce((count, imageKey) => {
      return task[imageKey] ? count + 1 : count;
    }, 0);
  };

  const allStatuses = ['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'];

  const SMALL_TEXT_THRESHOLD = 10;
  const MAX_TASK_HEIGHT = 4;
  const TASK_SPACING = 1;

  const groupedTasks = allStatuses.map((status) => {
    const filteredTasks = tasks.filter(task => (status === 'Document' && task.status === 'Pending') || task.status === status);
    const totalHeight = filteredTasks.length * (MAX_TASK_HEIGHT + TASK_SPACING);
    const shrinkFactor = totalHeight > MAX_TASK_HEIGHT * 5 ? (MAX_TASK_HEIGHT * 5) / totalHeight : 1;

    return { status, tasks: filteredTasks, shrinkFactor };
  });

  return (
    <div className="p-4 sm:p-8 bg-white shadow-lg rounded-lg overflow-x-auto">
      {/* Navigation buttons and current week */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevWeek} className="bg-blue-500 text-white px-4 py-2 rounded">Prev</button>
        <h2 className="text-lg font-semibold">
          {format(currentWeekStart, 'MMMM d')} – {format(addDays(currentWeekStart, 6), 'MMMM d')}
        </h2>
        <button onClick={handleNextWeek} className="bg-blue-500 text-white px-4 py-2 rounded">Next Week</button>
      </div>

      <div className="relative w-full">
        <div className="flex items-center border-b border-gray-300">
          <div className="w-36 min-w-[1rem] border-r border-gray-300 p-2 text-center -ml-28"></div>
          {daysOfCurrentWeek.map((day) => (
            <div key={day} className="flex-1 text-center border-r border-gray-300 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          {groupedTasks.map(({ status, tasks, shrinkFactor }) => (
            <div
              key={status}
              className="flex items-start border-b border-gray-300 mt-16"
              style={{
                minHeight: `${tasks.length * (MAX_TASK_HEIGHT + TASK_SPACING) * shrinkFactor}rem`,
              }}
            >
              <div className="w-28 min-w-[7rem] border-r border-gray-300 p-2 flex items-start -ml-20">
                <div className="transform rotate-90 ml-20 -translate-x-1/2 mb-10 text-xl font-semibold relative translate-y-[-0.5rem]">
                  {status}
                </div>
              </div>
              <div className="relative flex-1">
                {tasks.map((task, index) => {
                  const taskWidth = calculateTaskWidth(task.startDate, task.dueDate);
                  const taskLeft = calculateTaskLeft(task.startDate);
                  const taskHeight = MAX_TASK_HEIGHT * shrinkFactor;
                  const textSizeClass = taskWidth < SMALL_TEXT_THRESHOLD ? 'text-xs' : 'text-sm';

                  return (
                    <div
                      key={task.id}
                      className={`absolute ${getStatusIconColor(task.status)} text-white p-2 rounded`}
                      style={{
                        width: `${taskWidth}%`,
                        left: `${taskLeft}%`,
                        top: `${index * (taskHeight + TASK_SPACING)}rem`,
                        height: `${taskHeight}rem`,
                        lineHeight: `${taskHeight}rem`,
                        display: taskWidth > 0 ? 'flex' : 'none',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Task content with assignee avatars on the left and task name on the right */}
                      <div className="flex items-center">
                        {/* Assignee avatars */}
                        <div className="flex -space-x-3 mr-2">
                          {task.assignee && task.assignee.map((member, index) => (
                            <img
                              key={index}
                              src={member.profilePicture?.url || '/path/to/default/avatar.png'}
                              alt={member.name}
                              className="w-6 h-6 rounded-full border-2 border-white"
                              title={member.name}
                            />
                          ))}
                        </div>
                        {/* Task name */}
                        <div className={`text-black font-semibold ${textSizeClass}`}>
                          {task.taskName}
                        </div>
                      </div>
                    
                      {/* Display other details like images */}
                      <div className={`flex items-center mt-1 text-xs ${textSizeClass}`}>
                        {task.attachment && task.attachment.length > 0 && (
                          <div className="flex items-center text-xs">
                            <FontAwesomeIcon icon={faImage} className="mr-1 text-gray-700" />
                            <span>{task.attachment.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
