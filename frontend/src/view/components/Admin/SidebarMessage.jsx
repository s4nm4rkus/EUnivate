import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCircle, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../admin.css';

const SidebarMessage = () => {
  return (
    <div className="bg-white h-full w-80 flex flex-col border-r border-gray-300">
      {/* About Section */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-3">Topic</p>
            <p className="text-sm text-gray-800">All about monster hunter world game is here.</p>
          </div>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-3">Description</p>
            <p className="text-sm text-gray-800">
              In this channel we can collaborate and play monster hunter together with our friends.
            </p>
          </div>
        </div>
        <hr className="border border-gray-200 mt-4" />
      </div>

      {/* Members Section */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Member <span className='bg-orange-500 text-white rounded-lg pl-2 pr-2'>1,042</span></h2>
        
          <FontAwesomeIcon icon={faUserPlus} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="team mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} className="text-purple-500 mr-2" />
              <span className="text-sm font-medium">Team</span>
            </div>
            <span className="text-xs bg-gray-200 py-1 px-2 rounded">Superboard</span>
          </div>
        </div>
        
        {/* Online Members */}
        <div className="online mb-6">
          <h3 className="text-sm font-semibold mb-2">Online - 3</h3>
          <div className="member flex items-center mb-2">
            <img src="https://via.placeholder.com/40" alt="Samuel Reza" className="rounded-full w-8 h-8 mr-2" />
            <div className="flex-1">
              <p className="text-sm">Samuel Reza</p>
            </div>
            <FontAwesomeIcon icon={faCircle} className="text-green-500" />
          </div>
          <div className="member flex items-center mb-2">
            <img src="https://via.placeholder.com/40" alt="Daniel Crag" className="rounded-full w-8 h-8 mr-2" />
            <div className="flex-1">
              <p className="text-sm">Daniel Crag</p>
            </div>
            <FontAwesomeIcon icon={faCircle} className="text-green-500" />
          </div>
          <div className="member flex items-center mb-2">
            <img src="https://via.placeholder.com/40" alt="Rezza" className="rounded-full w-8 h-8 mr-2" />
            <div className="flex-1">
              <p className="text-sm">Rezza</p>
            </div>
            <FontAwesomeIcon icon={faCircle} className="text-green-500" />
          </div>
        </div>

        {/* Offline Members */}
        <div className="offline">
          <h3 className="text-sm font-semibold mb-2">Offline - 1,398</h3>
          <div className="member flex items-center mb-2">
            <img src="https://via.placeholder.com/40" alt="Mark Wazauiski" className="rounded-full w-8 h-8 mr-2" />
            <div className="flex-1">
              <p className="text-sm">Mark Wazauiski</p>
            </div>
            <FontAwesomeIcon icon={faCircle} className="text-gray-400" />
          </div>
          {/* Add more offline members as needed */}
        </div>
      </div>
    </div>
  );
}

export default SidebarMessage;
