import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

const Showcase = ({ showcase }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 relative">

      {/* Save/Bookmark Icon */}
      <div className="absolute top-4 right-4">
        <FontAwesomeIcon icon={farBookmark} className="text-gray-500 w-6 h-6" />
      </div>

      {/* Main Image Section */}
      <div className="flex justify-center items-center mt-12">
        <img
          src={showcase.imageUrl}
          alt={showcase.title}
          className="w-full h-56 object-cover rounded-xl"
        />
      </div>

      <div className="mt-6 text-start">
        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900">{showcase.title}</h3>
        <p className="text-gray-600">{showcase.description}</p>

        {/* Tags */}
        <div className="mt-4 flex justify-start space-x-4">
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            {showcase.projectType}
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
            {showcase.course}
          </span>
            {/* Team Members */}

        </div>

        <div className="mt-4 flex justify-start">
          {showcase.teamMembers.map((member, index) => (
            <img
              key={index}
              src={member}
              alt="Team Member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Showcase;
