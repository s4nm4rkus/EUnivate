import React, { useState, useEffect } from 'react';
import { FaPlus, FaCalendar, FaPaperclip, FaCheckCircle } from 'react-icons/fa';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from './KanbanModals/Modal';
import axios from 'axios';

const ItemType = {
  TASK: 'task',
};

const Kanban = ({ projectId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!projectId) {
          console.error('Project ID is not defined');
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-tasks/${projectId}`);
        setTasks(response.data.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [projectId]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTask = tasks.find(task => task._id === taskId);
    if (updatedTask) {
      updatedTask.status = newStatus;
      setTasks([...tasks]);
      updateTaskStatus(taskId, newStatus);
    }
  };

  const handleTaskSubmit = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const Column = ({ status, children }) => {
    const [, drop] = useDrop({
      accept: ItemType.TASK,
      drop: (item) => moveTask(item.id, status),
    });

    return (
      <div ref={drop} className="w-full sm:w-1/5 p-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl text-gray-600 font-bold">{status}</h2>
          <button
            onClick={handleOpenModal}
            className="text-gray-600 p-0 flex items-center justify-center"
            style={{ width: '30px', height: '30px' }}
          >
            <FaPlus size={16} />
          </button>
        </div>
        <div className="space-y-2">{children}</div>
      </div>
    );
  };

  const TaskCard = ({ task }) => {
    const [, drag] = useDrag({
      type: ItemType.TASK,
      item: { id: task._id },
    });

    // Set background color based on priority
    const getPriorityBackgroundColor = (priority) => {
      switch (priority) {
        case 'easy':
          return 'bg-green-200 text-green-800'; // Light green background
        case 'medium':
          return 'bg-orange-200 text-orange-800'; // Light orange background
        case 'hard':
          return 'bg-red-200 text-red-800'; // Light red background
        default:
          return 'bg-gray-200 text-gray-800'; // Default background
      }
    };

    // Function to format the start month
    const formatStartMonth = (startDate) => {
      if (!startDate) return 'N/A';
      const date = new Date(startDate);
      return date.toLocaleString('default', { month: 'long' });
    };

    return (
      <div ref={drag} className="p-4 rounded-lg shadow-md bg-white relative">
        <div className="flex items-start justify-between">
          <div className={`px-2 py-1 text-lg font-bold rounded-sm ${getPriorityBackgroundColor(task.priority)}`}>
            {task.priority}
          </div>
          {/* Display assignee profile pictures */}
          <div className='flex -space-x-3'>
            {task.assignee && task.assignee.map((member, index) => (
              <img
                key={index}
                src={member.profilePicture}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={member.name}
              />
            ))}
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">{task.taskName}</h2>
          <p className="text-lg text-gray-800">{task.description}</p>
          {/* Display attachments */}
          {task.attachment && task.attachment.length > 0 && (
            <div className="mt-4 flex overflow-x-auto space-x-2 py-2">
              {task.attachment.map((attachment, index) => (
                <img
                  key={index}
                  src={attachment.url}
                  alt={`Attachment ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>
        {/* Display additional details */}
        <div className="mt-5 flex items-center space-x-3 overflow-x-auto">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <FaCalendar className="text-gray-400" />
            <p>{formatStartMonth(task.startDate)}</p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <FaPaperclip className="text-gray-400" />
            <p>{task.attachment ? task.attachment.length : 0}</p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <FaCheckCircle className="text-gray-400" />
            <p>{task.objectives ? task.objectives.length : 0}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-wrap p-4">
        {['Document', 'Todo', 'Ongoing', 'Done', 'Backlog'].map((status) => (
          <Column key={status} status={status}>
            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <TaskCard key={task._id} task={task} />
              ))}
          </Column>
        ))}
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        projectId={projectId} 
        onTaskSubmit={handleTaskSubmit} 
      />
    </DndProvider>
  );
};

export default Kanban;
