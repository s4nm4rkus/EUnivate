import React from 'react';
import { FaFlag } from 'react-icons/fa';

const TaskHeader = ({ projectName, taskName, isEditingTaskName, editedTaskName, handleTaskNameChange, handleTaskNameClick, handleSaveTaskName, showSaveButton }) => {
  return (
    <div className="flex items-center mb-4">
      <div className={`w-6 h-6 rounded-full border-2 ${taskName.priority === 'done' ? 'bg-gray-500 border-gray-500' : 'border-gray-300'} flex items-center justify-center`}>
        {taskName.priority === 'done' && <div className="w-4 h-4 rounded-full bg-white"></div>}
      </div>
      <div className="ml-2">
        <h2 className="text-sm text-gray-500 font-semibold">{projectName}</h2>
        {isEditingTaskName ? (
          <div className="flex items-center">
            <input
              type="text"
              className="text-xl font-semibold text-gray-500 border-b border-gray-300 mr-2"
              value={editedTaskName}
              onChange={handleTaskNameChange}
              onBlur={handleSaveTaskName} // Save when input loses focus
              autoFocus
            />
            {showSaveButton && (
              <button className="bg-red-500 text-white py-1 px-2 rounded ml-2" onClick={handleSaveTaskName}>
                Save
              </button>
            )}
          </div>
        ) : (
          <h2
            className="text-xl font-semibold text-gray-500 cursor-pointer"
            onClick={handleTaskNameClick}
          >
            {taskName}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TaskHeader;
