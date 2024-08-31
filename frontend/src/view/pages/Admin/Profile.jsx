import React, { useState } from 'react';
import { User } from "../../../constants/assets";

const Profile = () => {
  // State to manage whether each input is editable or not
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [isBiodataEditable, setIsBiodataEditable] = useState(false);

  // Toggle functions for each field
  const handleEditClick = (field) => {
    if (field === 'email') {
      setIsEmailEditable(prevState => !prevState);
    } else if (field === 'phone') {
      setIsPhoneEditable(prevState => !prevState);
    } else if (field === 'biodata') {
      setIsBiodataEditable(prevState => !prevState);
    }
  };

  return (
    <div className="space-y-4"> {/* Added space between the sections */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={User}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4" 
          />
          <div className="flex flex-col">
            <div className="text-lg font-medium">User</div>
            <p className="text-sm text-gray-600 mt-1">@user</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900">
          Edit User Profile
        </button>
      </div>

      {/* Gray box with shadow */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex flex-col flex-grow">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder=""
                className="px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={!isEmailEditable}
              />
            </div>
            <button 
              className="ml-2 px-4 py-1 border border-blue-500 text-blue-500 bg-transparent rounded hover:bg-blue-100 hover:text-blue-700"
              onClick={() => handleEditClick('email')}
            >
              {isEmailEditable ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col flex-grow">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder=""
                className="px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={!isPhoneEditable}
              />
            </div>
            <button 
              className="ml-2 px-4 py-1 border border-blue-500 text-blue-500 bg-transparent rounded hover:bg-blue-100 hover:text-blue-700"
              onClick={() => handleEditClick('phone')}
            >
              {isPhoneEditable ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="flex items-center">
            <div className="flex flex-col flex-grow">
              <label htmlFor="biodata" className="text-sm font-medium text-gray-700 mb-1 ml-1">
                Biodata
              </label>
              <input
                id="biodata"
                type="text"
                placeholder=""
                className="px-2 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                disabled={!isBiodataEditable}
              />
            </div>
            <button 
              className="ml-2 px-4 py-1 border border-blue-500 text-blue-500 bg-transparent rounded hover:bg-blue-100 hover:text-blue-700"
              onClick={() => handleEditClick('biodata')}
            >
              {isBiodataEditable ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12"> {/* Increased margin to push it down further */}
  <h4 className="text-2xl font-bold text-gray-900">Password & Authentication</h4>
  <p className="mt-2 text-gray-600">
    You can change your password periodically to increase the security of your account. Make sure you remember your current password to prove that the person who changed the password was actually you.
  </p>
  <div className="mt-3 flex"> {/* Reduced margin-top from 4 to 3 */}
    <button className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900">
      Change Password
    </button>
  </div>
</div>

<div className="mt-12"> {/* Increased margin to push it down further */}
  <h4 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h4>
  <p className="mt-2 text-gray-600">
  Protect your account with an extra layer of security. Once configured, you will be required to eter both your password and an authentication code from your mobile phone in order to sign in.  </p>
  <div className="mt-3 flex"> {/* Reduced margin-top from 4 to 3 */}
    <button className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900">
    Enable Two-Factor Auth
    </button>
  </div>
</div>



    </div>
  );
}

export default Profile;
