import React from 'react';

const Status = ({ status, handleStatusClick, showStatusDropdown, statuses, handleStatusChange }) => {
  return (
    <div className="mb-4 flex items-center text-gray-500 relative">
      <div className="text-gray-500 font-semibold">Status:</div>
      <div className="ml-9 flex items-center cursor-pointer" onClick={handleStatusClick}>
        <span className="ml-2">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {showStatusDropdown && (
        <div className="absolute top-10 left-20 bg-white border border-gray-300 shadow-lg rounded-md w-40 z-10">
          <ul>
            {statuses.map((status) => (
              <li
                key={status.value}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleStatusChange(status.value)}
              >
                {status.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Status;
