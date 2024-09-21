import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaRegCalendarAlt, FaFlag, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const TaskDetailModal = ({ isOpen, onClose, task, projectName, onUpdateTask }) => {
  if (!task) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [newObjective, setNewObjective] = useState('');
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('');
  const [comment, setComment] = useState('');
  const [isAddingObjective, setIsAddingObjective] = useState(false); // New state for showing/hiding objective input
  const [commentsList, setCommentsList] = useState([]); // State to hold comments

  const isDone = task.priority === 'done';

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
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
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
      setNewObjective(''); // Clear input field after adding
      setIsAddingObjective(false); // Hide the input field after adding
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
      setNewAttachmentUrl(''); // Clear input field after adding
    }
  };


  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        text: comment,
        name: "Your Name", // Replace with actual user name
        avatar: "path/to/your/avatar.jpg" // Replace with actual avatar path
      };
      setCommentsList([...commentsList, newComment]); // Add comment to the list
      setComment(''); // Clear the input field after submission
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

        <div className="flex items-center mb-4">
          <div className={`w-6 h-6 rounded-full border-2 ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-300'} flex items-center justify-center`}>
            {isDone && <div className="w-4 h-4 rounded-full bg-white"></div>}
          </div>
          <div className="ml-2">
            <h2 className="text-sm">{projectName}</h2>
            <h2 className="text-xl font-semibold">{task.taskName}</h2>
          </div>
        </div>

        {/* Assignees Section */}
        <div className="mb-4 flex items-center">
          <strong className="mr-2">Assignees:</strong>
          <div className='flex -space-x-2'> 
            {task.assignee && task.assignee.map((member, index) => (
              <img key={index} src={member.profilePicture} alt={member.name} className="w-8 h-8 rounded-full border-2 border-white" title={member.name} />
            ))}
          </div>
        </div>

        {/* Dates and Priority Section */}
        <div className="mb-4 flex items-center">
          <strong>Start Date:</strong> <FaRegCalendarAlt className="text-gray-600 ml-2" /> <span className='ml-2'>{new Date(task.startDate).toLocaleDateString()}</span>
        </div>
        <div className="mb-4 flex items-center">
          <strong>Due Date:</strong> <FaRegCalendarAlt className="text-gray-600 ml-4" /> <span className='ml-2'>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not specified'}</span>
        </div>
        <div className="mb-4 flex items-center">
          <strong>Priority:</strong> 
          <FaFlag className={`ml-7 ${getPriorityColor(task.priority)}`} />
          <span className="ml-2">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
        </div>
        <div className="mb-4">
          <strong>Status:</strong> <span className='ml-9'>{task.status || 'Not specified'}</span>
        </div>

        {/* Editable Description Section */}
        <div className="mb-4">
          <strong>Description:</strong>
          {isEditing ? (
            <div>
              <textarea className="w-full mt-2 p-2 border border-gray-300 rounded" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
              <button className="mt-2 bg-red-500 text-white py-1 px-4 rounded text-sm hover:bg-red-600 transition-all duration-200" onClick={handleSaveDescription}>
                Save
              </button>
            </div>
          ) : (
            <div className="relative">
              <p className="mt-2">{task.description}</p>
              <FaEdit className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-gray-700" size={18} onClick={handleEditClick} />
            </div>
          )}
        </div>

        {/* Objectives Section with Add and Delete Icons */}
        <div className="mb-4">
       {/* Objectives Section with Add and Delete Icons */}
<div className="mb-4 flex justify-between items-center">
  <strong>Objectives:</strong>
  <FaPlus className="cursor-pointer text-gray-500 hover:text-black" onClick={() => setIsAddingObjective(!isAddingObjective)} />
</div>
{task.objectives && task.objectives.length > 0 ? (
  <ul className="list-disc list-inside">
    {task.objectives.map((objective, index) => (
      <li key={index} className="mt-1 flex justify-between items-center">
        {objective}
        <FaTrash className="ml-2 cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleDeleteObjective(objective)} />
      </li>
    ))}
  </ul>
) : (
  <span>No objectives defined</span>
)}
{isAddingObjective && (
  <div className="mt-2 flex">
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="New objective"
      value={newObjective}
      onChange={(e) => setNewObjective(e.target.value)}
    />
    <button className="ml-2 bg-red-700 text-white py-1 px-4 rounded" onClick={handleAddObjective}>Add</button>
  </div>
)}

        </div>

       {/* Attachments Section */}
<div className="mb-4 flex justify-between items-center">
  <strong>Attachments:</strong>
  <FaPlus
    className="cursor-pointer text-gray-500 hover:text-black"
    onClick={() => document.getElementById('attachmentInput').click()}
  />
</div>
<input
  type="file"
  id="attachmentInput"
  className="hidden"
  accept="image/*"
  onChange={(e) => handleFileUpload(e)}
/>
{task.attachment && task.attachment.length > 0 ? (
  <div className="flex overflow-x-auto space-x-2 py-2">
    {task.attachment.map((attachment, index) => (
      <div key={index} className="relative">
        <img src={attachment.url} alt={`Attachment ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
        <FaTrash
          className="absolute top-1 right-1 cursor-pointer text-red-500 hover:text-red-700"
          onClick={() => handleDeleteAttachment(attachment.url)}
        />
      </div>
    ))}
  </div>
) : (
  <span>No attachments</span>
)}

           {/* Ask Question or Post an Update Section */}
           <div className="mb-4">
          <textarea
            className="w-full mt-2 p-2 border border-gray-300 rounded"
            placeholder="Ask question or post an update"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          className="mt-2 bg-red-700 text-white py-2 px-6 rounded text-md w-full hover:bg-red-700 transition-all duration-200"
          onClick={handleCommentSubmit}
        >
          Post
        </button>

        {/* Render posted comments */}
      <div className="mt-4">
  <h3 className="font-semibold">Comments:</h3>
  {commentsList.length > 0 ? (
    <ul className="list-disc list-inside">
      {commentsList.map((cmt, index) => (
        <li key={index} className="mt-1 flex items-start">
          <img src={cmt.avatar} alt={cmt.name} className="w-8 h-8 rounded-full mr-2" />
          <div>
            <strong>{cmt.name}</strong>
            <p>{cmt.text}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <span>No comments yet.</span>
  )}
</div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
