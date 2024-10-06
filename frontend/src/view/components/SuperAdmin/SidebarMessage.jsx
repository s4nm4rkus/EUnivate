import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCircle, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../../admin.css';

const SidebarMessage = () => {
  const [invitedMembers, setInvitedMembers] = useState([]); 

 
  useEffect(() => {
    const fetchInvitedMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/invited-members');
        setInvitedMembers(response.data); 
      } catch (error) {
        console.error('Error fetching invited members:', error);
      }
    };

    fetchInvitedMembers();
  }, []);

  return (
    <div className="bg-white right-4 bottom-0 flex flex-col border-r border-gray-300 sidebar-message-content min-h-screen">  
      <div className="p-3">  
        <h2 className="text-lg font-semibold mb-2 ml-2">About</h2>  
        <div className="bg-gray-100 p-3 rounded-lg">  
          <div className="mb-2">  
            <p className="text-sm font-medium text-gray-600 mb-2">Topic</p>  
            <p className="text-sm text-gray-800">All about monster hunter world game is here.</p>
          </div>
          <div className="mb-2">  
            <p className="text-sm font-medium text-gray-600 mb-2">Description</p>  
            <p className="text-sm text-gray-800">
              In this channel we can collaborate and play monster hunter together with our friends.
            </p>
          </div>
        </div>
        <hr className="border border-gray-200 mt-3" />  
      </div>

       
      <div className="p-3 flex-1 ml-2 overflow-y-auto">  
        <div className="flex justify-between items-center mb-3">  
          <h2 className="text-lg font-semibold">Member <span className='bg-orange-500 text-white rounded-lg pl-2 pr-2 member-count'>1,042</span></h2> 
          <FontAwesomeIcon icon={faUserPlus} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="team mb-4">  
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-xl mr-2" />  
              <div>
                <h3 className="text-sm font-semibold">Team name</h3>
                <p className="text-xs text-gray-600">4 members</p>  
              </div>
            </div>
            <FontAwesomeIcon icon={faCircle} className="text-gray-300 text-xs" />  
          </div>
        </div>

        
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Invited Members</h3>
          {invitedMembers.length > 0 ? (
            invitedMembers.map((member) => (
              <div key={member._id} className="flex items-center mb-2">
                <img
                  src={member.profilePicture?.url || 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png'}
                  alt={member.name || 'Profile Picture'}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <div>
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-gray-600">{member.role || 'Member'}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No invited members</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarMessage;
