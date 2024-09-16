import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from './KanbanModals/Modal';
import axios from 'axios';

const Kanban = ({ projectId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

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

  const handleTaskSubmit = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn !== destinationColumn) {
      const updatedTasks = tasks.map(task => {
        if (task._id === draggableId) {
          task.status = destinationColumn;
        }
        return task;
      });
      setTasks(updatedTasks);
      updateTaskStatus(draggableId, destinationColumn);
    }
  };

  const Column = ({ status, children }) => (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-1/5"
        >
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  const TaskCard = ({ task, index }) => (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded shadow relative"
        >
          <div>{task.priority}</div>
          <h3 className="text-lg font-semibold">{task.taskName}</h3>
          <p className="text-gray-700">{task.description}</p>
        </div>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4">
        {['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'].map((status) => (
          <Column key={status} status={status}>
            {tasks
              .filter(task => (task.status === status || (status === 'Document' && task.status === 'Pending')))
              .map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
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
    </DragDropContext>
  );
};

export default Kanban;
