import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faStar, faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const MessageContent = () => {
  return (
    <div className="message-content flex-1 bg-gray-100 p-6">
      {/* Header */}
      <div className="header mb-4">
        <h2 className="text-xl font-semibold">Superboard</h2>
        <p className="text-sm text-gray-600">Superboard general chat</p>
      </div>

      {/* Messages */}
      <div className="messages flex flex-col space-y-4">
        <div className="message flex">
          <div className="avatar mr-4">
            <img src="https://via.placeholder.com/40" alt="Mark Wazauiski" className="rounded-full" />
          </div>
          <div className="message-content bg-white p-4 rounded-lg shadow-sm flex-1">
            <div className="message-header flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">Mark Wazauiski</p>
              <p className="text-xs text-gray-400">12:50 PM</p>
            </div>
            <p className="text-sm">Dude I can't beat lunastra alone 😟 Please somebody help me!</p>
            <div className="message-actions flex space-x-2 mt-2">
              <FontAwesomeIcon icon={faReply} className="text-gray-400 cursor-pointer" />
              <FontAwesomeIcon icon={faStar} className="text-gray-400 cursor-pointer" />
              <FontAwesomeIcon icon={faHeart} className="text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Add more messages here following the same structure */}
      </div>

      {/* Message Input */}
      <div className="message-input mt-4 flex items-center">
        <input
          type="text"
          placeholder="Message Ilham"
          className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="ml-4 p-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default MessageContent;
