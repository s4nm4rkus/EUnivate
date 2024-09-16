import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './KanbanModals/Modal';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Define unique IDs for each status
const statusMapping = {
  Document: 'droppable-document',
  Todo: 'droppable-todo',
  Ongoing: 'droppable-ongoing',
  Done: 'droppable-done',
  Backlogs: 'droppable-backlogs'
};

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

  const handleTaskSubmit = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [draggedTask] = updatedTasks.splice(source.index, 1);
    // Map back droppableId to status
    draggedTask.status = Object.keys(statusMapping).find(key => statusMapping[key] === destination.droppableId);
    updatedTasks.splice(destination.index, 0, draggedTask);

    setTasks(updatedTasks); 
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4">
        {Object.keys(statusMapping).map((statusKey) => (
          <Droppable droppableId={statusMapping[statusKey]} key={statusKey}>
            {(provided) => (
              <div
                className="w-1/5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl text-gray-600 font-bold">{statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}</h2>
                  <button
                    onClick={handleOpenModal}
                    className="text-gray-600 p-0 flex items-center justify-center"
                    style={{ width: '30px', height: '30px' }}
                  >
                    <FaPlus size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  {tasks
                    .filter(task => task.status === statusKey)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            className="bg-white p-4 rounded shadow"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>{task.priority}</div>
                            <h3 className="text-lg font-semibold">{task.taskName}</h3>
                            <p className="text-gray-700">{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
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
