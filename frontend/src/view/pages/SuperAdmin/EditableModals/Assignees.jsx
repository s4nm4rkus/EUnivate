import React from 'react';

const Assignees = ({ assignees }) => {
  return (
    <div className="mb-4 flex items-center">
      <strong className="mr-2 text-gray-500 font-semibold">Assignees:</strong>
      <div className='flex -space-x-2'> 
        {assignees && assignees.map((member, index) => (
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
  );
};

export default Assignees;
