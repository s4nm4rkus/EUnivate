import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SettingProfile = () => {
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');         
  const [biodata, setBiodata] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const defaultProfilePictureUrl = 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png';

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{9,}$/;
    return passwordRegex.test(password);
  };
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setEmail(storedUser.email || '');
      setPhoneNumber(storedUser.phoneNumber || '');
      setBiodata(storedUser.role || '');
      setUsername(storedUser.username || '');
      setFirstName(storedUser.firstName || '');
      setLastName(storedUser.lastName || '');

      // Handle the profile picture logic
      if (storedUser.profilePicture && storedUser.profilePicture.url) {
        setProfilePicture(storedUser.profilePicture.url);
      } else if (storedUser.profilePicture && typeof storedUser.profilePicture === 'string') {
        setProfilePicture(storedUser.profilePicture);
      } else {
        setProfilePicture(defaultProfilePictureUrl);
      }
    }

    const check2FAStatus = async () => {
      try {
        if (storedUser && storedUser._id) {
          const response = await axios.get(`http://localhost:5000/api/users/${storedUser._id}/verify-2fa`);


          console.log('Response from 2FA status check:', response.data.twoFactorEnabled);

          setIs2FAEnabled(response.data.twoFactorEnabled);

          storedUser.twoFactorEnabled = response.data.twoFactorEnabled;
          localStorage.setItem('user', JSON.stringify(storedUser));

          console.log('Updated local storage with 2FA status:', storedUser.twoFactorEnabled);
        }
      } catch (error) {
        console.error('Error checking 2FA status:', error);
      }
    };

    check2FAStatus();
  }, []);

  const handleEditClick = async (field) => {
    if (field === 'email') {
      setIsEmailEditable((prevState) => !prevState);
      if (isEmailEditable) await handleSaveProfile(false); // Modal should not close
    } else if (field === 'phone') {
      setIsPhoneEditable((prevState) => !prevState);
      if (isPhoneEditable) await handleSaveProfile(false); // Modal should not close
    }
  };

  const toggleEditProfileModal = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  const toggleChangePasswordModal = () => {
    setShowChangePasswordModal(!showChangePasswordModal);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSaveProfile = async (shouldCloseModal = true) => {
    const uploadImageToCloudinary = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'EunivateImage'); // Replace with your actual Cloudinary upload preset
      formData.append('cloud_name', 'dzxzc7kwb'); // Replace with your actual Cloudinary cloud name

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dzxzc7kwb/image/upload',
          formData
        );
        return response.data.url; // This is the URL of the uploaded image
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    };

    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve the stored user data

    if (!storedUser || !storedUser._id) {
      console.error('User is not logged in or user ID is missing.');
      return;
    }

    let profilePictureUrl = profilePicture;
    if (profilePicture instanceof File) {
      try {
        profilePictureUrl = await uploadImageToCloudinary(profilePicture);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        return;
      }
    } else if (!profilePictureUrl) {
      // If profilePicture is empty or null, set it to default
      profilePictureUrl = defaultProfilePictureUrl;
    }

    const updatedUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      profilePicture: profilePictureUrl,
      role: biodata, // Add the biodata (role) to be updated
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${storedUser._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the request
          },
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data)); // Update local storage
      setIsEmailEditable(false);
      setIsPhoneEditable(false);

      // Conditionally close the modal based on the parameter
      if (shouldCloseModal) {
        toggleEditProfileModal();
      }
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 9 characters long and include at least one number and one symbol.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser._id) {
        setError('User not logged in or user ID is missing.');
        return;
      }
  
      const response = await axios.put(
        `http://localhost:5000/api/users/${storedUser._id}/password`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setSuccess("Password changed successfully!");
        setTimeout(() => {
          setShowChangePasswordModal(false);
          setNewPassword('');
          setConfirmPassword('');
          setError('');
          setSuccess('');
        }, 3000);
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  //HANDLE 2FA
  const handleEnableTwoFactorAuth = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('http://localhost:5000/api/users/enable-2fa', {
        userId: storedUser._id,
      });

      if (response.status === 200) {
        setSuccess('OTP sent. Please check your inbox.');
        setShowOtpModal(true); // Show the OTP modal
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred while enabling Two-Factor Authentication.');
      console.error('Error enabling 2FA:', err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:5000/api/users/${storedUser._id}/verify-2fa`, {
        params: {
          otp: otp, // Pass OTP here as a query parameter
        },
      });
  
      if (response.status === 200) {
        setSuccess('Two-Factor Authentication enabled successfully!');
        setIs2FAEnabled(true); // Update UI to reflect 2FA is enabled
        setShowOtpModal(false); // Hide OTP modal
      } else {
        setError(response.data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred while verifying OTP.');
      console.error('Error verifying OTP:', err);
    }
  };

  const handleDisableTwoFactorAuth = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('http://localhost:5000/api/users/disable-2fa', {
        userId: storedUser._id,
      });

      if (response.status === 200) {
        setSuccess('Two-Factor Authentication disabled successfully.');
        setIs2FAEnabled(false);
        storedUser.twoFactorEnabled = false;
        localStorage.setItem('user', JSON.stringify(storedUser));
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred while disabling Two-Factor Authentication.');
      console.error('Error disabling 2FA:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={profilePicture || defaultProfilePictureUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div className="flex flex-col">
            <div className="text-lg font-medium">
              {firstName} {lastName}
            </div>
            <p className="text-sm text-gray-600 mt-1">@{username}</p>
          </div>
        </div>
        <button
          onClick={toggleEditProfileModal}
          className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900"
        >
          Edit User Profile
        </button>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex flex-col flex-grow">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
              <label
                htmlFor="biodata"
                className="text-sm font-medium text-gray-700 mb-1 ml-1"
              >
                Biodata
              </label>
              <input
                id="biodata"
                type="text"
                value={biodata}
                onChange={(e) => setBiodata(e.target.value)}
                className="px-2 py-1 border-none border-gray-300 focus:outline-none focus:border-blue-500"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h4 className="text-2xl font-bold text-gray-900">
          Password & Authentication
        </h4>
        <p className="mt-2 text-gray-600">
          You can change your password periodically to increase the security of
          your account. Make sure you remember your current password to prove
          that the person who changed the password was actually you.
        </p>
        <div className="mt-3 flex">
          <button
            onClick={toggleChangePasswordModal}
            className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900"
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h4 className="text-2xl font-bold text-gray-900">
          Two-Factor Authentication
        </h4>
        <p className="mt-2 text-gray-600">
          Protect your account with an extra layer of security. Once configured,
          you will be required to enter both your password and an authentication
          code from your mobile phone in order to sign in.
        </p>
        <div className="mt-3 flex">
          {is2FAEnabled ? (
            <button
              onClick={handleDisableTwoFactorAuth}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Disable Two-Factor Auth
            </button>
          ) : (
            <button
              onClick={handleEnableTwoFactorAuth}
              className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900">
              Enable Two-Factor Auth
            </button>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="editUsername"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="editUsername"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="editFirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="editFirstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="editLastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="editLastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="editProfilePicture"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Picture
                </label>
                <input
                  id="editProfilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="mt-1 block w-full"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-start">
              <button
                onClick={toggleEditProfileModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveProfile(true)} // Save the profile changes and close the modal
                className="ml-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
            <p className="text-gray-600 text-center mb-4">
              Please enter the OTP sent to your email to enable Two-Factor Authentication.
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-center text-lg"
                maxLength={6}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleVerifyOtp}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="space-y-4">
              {error && <p className="text-red-600">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-start">
              <button
                onClick={toggleChangePasswordModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword} // Save the password changes
                className="ml-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingProfile;
