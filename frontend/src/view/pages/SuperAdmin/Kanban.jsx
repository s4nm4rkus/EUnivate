import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaCircle, FaCalendarAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from './Modal';

const Kanban = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ profilePicture: '' });
  
  const location = useLocation();
  const projectName = location.state?.project?.name;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set the user state with the stored user data
    }
  }, []);

  useEffect(() => {
    if (projectName) {
      // Load tasks for the specific project from local storage
      const storedTasks = JSON.parse(localStorage.getItem(`kanban-${projectName}`)) || [];
      setTasks(storedTasks);
    }
  }, [projectName]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleTaskSubmit = (newTask) => {
    const newTaskWithId = { ...newTask, id: Date.now() }; // Using timestamp as a unique ID
    const updatedTasks = [...tasks, newTaskWithId];
    setTasks(updatedTasks);
    localStorage.setItem(`kanban-${projectName}`, JSON.stringify(updatedTasks));
    handleCloseModal();
  };

  const handleStatusChange = (task, newStatus) => {
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`kanban-${projectName}`, JSON.stringify(updatedTasks));
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    if (sourceStatus === destinationStatus) {
      // Reordering within the same status
      const reorderedTasks = reorderTasks(tasks, source, destination);
      setTasks(reorderedTasks);
    } else {
      // Moving between statuses
      const movedTasks = moveTaskBetweenStatuses(tasks, source, destination);
      setTasks(movedTasks);
    }

    localStorage.setItem(`kanban-${projectName}`, JSON.stringify(tasks));
  };

  const getStatusIconColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'text-yellow-500';
      case 'Done':
        return 'text-green-500';
      case 'Pending':
        return 'text-gray-500';
      case 'Todo':
        return 'text-pink-500';
      case 'Backlogs':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getDifficultyClasses = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-200 text-green-700';
      case 'Medium':
        return 'bg-orange-200 text-orange-700';
      case 'High':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const reorderTasks = (tasks, source, destination) => {
    const currentTasks = [...getTasksByStatus(source.droppableId)];
    const [removed] = currentTasks.splice(source.index, 1);
    currentTasks.splice(destination.index, 0, removed);
    
    // Update the main tasks array with reordered tasks in the same status
    return tasks.map(task => 
      task.status === source.droppableId ? currentTasks.find(t => t.id === task.id) || task : task
    );
  };

  const moveTaskBetweenStatuses = (tasks, source, destination) => {
    const sourceTasks = [...getTasksByStatus(source.droppableId)];
    const destinationTasks = [...getTasksByStatus(destination.droppableId)];

    const [removed] = sourceTasks.splice(source.index, 1);
    removed.status = destination.droppableId;
    destinationTasks.splice(destination.index, 0, removed);

    // Update the main tasks array after moving the task to a different status
    return tasks.map(task => {
      if (task.id === removed.id) return removed;
      if (task.status === source.droppableId) return sourceTasks.find(t => t.id === task.id) || task;
      if (task.status === destination.droppableId) return destinationTasks.find(t => t.id === task.id) || task;
      return task;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 p-4">
        {['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-1/4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold">{status}</h2>
                  <button
                    onClick={handleOpenModal}
                    className="bg-red-700 text-white p-1 rounded flex items-center justify-center"
                    style={{ width: '30px', height: '30px' }}
                  >
                    {status === 'Backlogs' ? <FaTimes size={16} /> : <FaPlus size={16} />}
                  </button>
                </div>

                <div>
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="border p-2 mb-2 rounded bg-white shadow-md"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`text-sm font-semibold py-2 px-3 rounded ${getDifficultyClasses(task.difficulty)}`}
                            >
                              {task.difficulty}
                            </div>
                            <div className="relative">
                              <FaCircle
                                size={20}
                                className={`${getStatusIconColor(task.status)} ml-4 cursor-pointer`}
                              />
                            </div>
                          </div>

                          <h3 className="font-semibold mb-2 text-2xl">{task.taskName}</h3>
                          <p className="mt-2">{task.objective}</p>

                          <div className="p-2 mt-2 flex items-center">
                            <div className="mr-2">
                              {user.profilePicture ? (
                                <img
                                  src={user.profilePicture.url || user.profilePicture}
                                  alt="Profile"
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                              ) : (
                                <img
                                  src="/mnt/data/image.png"
                                  alt="Default Profile"
                                  className="w-7 h-7 rounded-full object-cover"
                                />
                              )}
                            </div>

                            <div className="ml-auto flex items-center">
                              <FaCalendarAlt size={16} className="text-gray-500 mr-2" />
                              <p>
                                {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(task.startDate))}
                                {task.dueDate
                                  ? ` to ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(task.dueDate))}`
                                  : ''}
                              </p>
                            </div>
                          </div>
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

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onTaskSubmit={handleTaskSubmit} />
      </div>
    </DragDropContext>
  );
};

export default Kanban;
