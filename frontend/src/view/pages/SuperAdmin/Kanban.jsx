import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
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
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!projectId) {
          console.error('Project ID is not defined');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/users/sa-tasks/${projectId}`);
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
      await axios.patch(`http://localhost:5000/api/users/sa-tasks/${taskId}`, { status: newStatus });
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
      <div ref={drop} className="w-1/5">
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
    return (
      <div ref={drag} className="bg-white p-4 rounded shadow relative">
        <div>{task.priority}</div>
        <h3 className="text-lg font-semibold">{task.taskName}</h3>
        <p className="text-gray-700">{task.description}</p>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 p-4">
        {['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'].map((status) => (
          <Column key={status} status={status}>
            {tasks
              .filter(task => (task.status === status || (status === 'Document' && task.status === 'Pending')))
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
