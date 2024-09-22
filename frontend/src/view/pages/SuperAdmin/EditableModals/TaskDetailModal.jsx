import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaRegCalendarAlt, FaFlag, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TaskHeader from './ProjectName'; 
import Assignees from './Assignees';
import Dates from './Dates'; // Adjust the path as necessary
import Priority from './Priority'; // Adjust the path as necessary
import Status from './Status'; // Adjust the path as necessary
import Description from './Description'; // Adjust the path as necessary
import Objectives from './Objectives'; // Adjust the path as necessary
import Attachments from './Attachments'; // Adjust the path as necessary
import Comments from './Comments'; // Adjust the path as necessary

const TaskDetailModal = ({ isOpen, onClose, task, projectName, onUpdateTask }) => {
  if (!task) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [newObjective, setNewObjective] = useState('');
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('');
  const [comment, setComment] = useState('');
  const [isAddingObjective, setIsAddingObjective] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [startDate, setStartDate] = useState(new Date(task.startDate));
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));
  const [isEditingTaskName, setIsEditingTaskName] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.taskName);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);  // Added state for status dropdown

  const isDone = task.priority === 'done';

  const handleTaskNameClick = () => {
    setIsEditingTaskName(true);
    setShowSaveButton(false); // Hide save button initially
  };
  
  const handleSaveTaskName = () => {
    setIsEditingTaskName(false);
    onUpdateTask({ ...task, taskName: editedTaskName });
  };
  
  const handleTaskNameChange = (e) => {
    setEditedTaskName(e.target.value);
    setShowSaveButton(true); // Show save button when input changes
  };

  const handlePriorityClick = () => {
    setShowPriorityDropdown(!showPriorityDropdown);
  };
  const handlePriorityChange = (newPriority) => {
    // Update the task's priority and call onUpdateTask to save the change
    const updatedTask = { ...task, priority: newPriority };
    
    // Pass the updated task back to the parent component
    onUpdateTask(updatedTask);
    
    // Close the dropdown after updating
    setShowPriorityDropdown(false);
  };
  
  const priorities = [
    { label: 'Easy', value: 'easy', color: 'text-green-500' },
    { label: 'Medium', value: 'medium', color: 'text-yellow-500' },
    { label: 'Hard', value: 'hard', color: 'text-red-500' }
  ];

  const statuses = [
    { label: 'Document', value: 'document' },
    { label: 'Todo', value: 'todo' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Done', value: 'done' },
    { label: 'Backlog', value: 'backlog' }
  ];

  const handleStatusClick = () => {
    setShowStatusDropdown(!showStatusDropdown);
  };

  const handleStatusChange = (newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    onUpdateTask(updatedTask);
    setShowStatusDropdown(false);
  };
  


  const handleDateChange = (dateType, date) => {
    if (dateType === 'start') {
      setStartDate(date);
      onUpdateTask({ ...task, startDate: date });
    } else {
      setDueDate(date);
      onUpdateTask({ ...task, dueDate: date });
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      const updatedAttachments = [...task.attachment, { url }];
      onUpdateTask({ ...task, attachment: updatedAttachments });
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'easy':
        return 'text-green-500';  // Easy will be green
      case 'medium':
        return 'text-yellow-500'; // Medium will be yellow
      case 'hard':
        return 'text-red-500';    // Hard will be red
      default:
        return 'text-gray-500';   // Default gray for no priority
    }
  };
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveDescription = () => {
    setIsEditing(false);
    onUpdateTask({ ...task, description: editedDescription });
  };

  const handleDeleteObjective = (objective) => {
    const updatedObjectives = task.objectives.filter(obj => obj !== objective);
    onUpdateTask({ ...task, objectives: updatedObjectives });
  };

  const handleAddObjective = () => {
    if (newObjective) {
      const updatedObjectives = [...task.objectives, newObjective];
      onUpdateTask({ ...task, objectives: updatedObjectives });
      setNewObjective('');
      setIsAddingObjective(false);
    }
  };

  const handleDeleteAttachment = (attachmentUrl) => {
    const updatedAttachments = task.attachment.filter(att => att.url !== attachmentUrl);
    onUpdateTask({ ...task, attachment: updatedAttachments });
  };

  const handleAddAttachment = () => {
    if (newAttachmentUrl) {
      const updatedAttachments = [...task.attachment, { url: newAttachmentUrl }];
      onUpdateTask({ ...task, attachment: updatedAttachments });
      setNewAttachmentUrl('');
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        name: "Your Name",
        avatar: "path/to/your/avatar.jpg"
      };
      setCommentsList([...commentsList, newComment]);
      setComment('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 h-[100vh] max-h-[100vh] overflow-y-auto relative">
        <FaTimes className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-gray-800" size={20} onClick={onClose} />

<TaskHeader
projectName={projectName}
taskName={task.taskName}
isEditingTaskName={isEditingTaskName}
editedTaskName={editedTaskName}
handleTaskNameChange={handleTaskNameChange}
handleTaskNameClick={handleTaskNameClick}
handleSaveTaskName={handleSaveTaskName}
showSaveButton={showSaveButton}
/>
 
<Assignees 
assignees={task.assignee}
/>


<Dates 
  startDate={startDate} 
  setStartDate={setStartDate} 
  dueDate={dueDate} 
  setDueDate={setDueDate} 
  handleDateChange={handleDateChange} 
/>

<Priority 
  priority={task.priority}
  handlePriorityClick={handlePriorityClick}
  showPriorityDropdown={showPriorityDropdown}
  priorities={priorities}
  handlePriorityChange={handlePriorityChange}
  getPriorityColor={getPriorityColor}
/>




<Status 
  status={task.status}
  handleStatusClick={handleStatusClick}
  showStatusDropdown={showStatusDropdown}
  statuses={statuses}
  handleStatusChange={handleStatusChange}
/>



<Description
  description={task.description}
  isEditing={isEditing}
  onEdit={handleEditClick}
  onSave={handleSaveDescription}
/>


<Objectives
  objectives={task.objectives}
  isAddingObjective={isAddingObjective}
  newObjective={newObjective}
  setNewObjective={setNewObjective}
  onAddObjective={handleAddObjective}
  onDeleteObjective={handleDeleteObjective}
  toggleAddingObjective={() => setIsAddingObjective(!isAddingObjective)}
/>

    
<Attachments
  attachments={task.attachment}
  onFileUpload={handleFileUpload}
  onDeleteAttachment={handleDeleteAttachment}
/>


<Comments
  comment={comment}
  setComment={setComment}
  onCommentSubmit={handleCommentSubmit}
  commentsList={commentsList}
/>

     
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
