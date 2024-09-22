import React from 'react';
import { FaFlag } from 'react-icons/fa';

const Priority = ({ priority, handlePriorityClick, showPriorityDropdown, priorities, handlePriorityChange, getPriorityColor }) => {
  return (
    <div className="mb-4 flex items-center text-gray-500 relative">
      <div className="text-gray-500 font-semibold">Priority:</div>
      <div className="ml-9 flex items-center cursor-pointer" onClick={handlePriorityClick}>
        <FaFlag className={getPriorityColor(priority)} />
        <span className={`ml-2 ${getPriorityColor(priority)}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)} {/* Apply dynamic color to the text */}
        </span>
      </div>

      {showPriorityDropdown && (
        <div className="absolute top-10 left-20 bg-white border border-gray-300 shadow-lg rounded-md w-40 z-10">
          <ul>
            {priorities.map((priority) => (
              <li
                key={priority.value}
                className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${priority.color}`}
                onClick={() => handlePriorityChange(priority.value)} // Call this function to change priority
              >
                <FaFlag className={priority.color} />
                <span className="ml-2">{priority.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Priority;
