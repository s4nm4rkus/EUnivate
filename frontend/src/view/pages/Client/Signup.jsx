import React, { useState } from 'react';
import { Loginback } from '../../../constants/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Loginback})` }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="First name"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Last name"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative mt-4">
          <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Password */}
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>

        <button className="w-full bg-yellow-500 text-white p-3 rounded-lg shadow hover:bg-yellow-600 transition duration-300 mt-6">
          Sign Up
        </button>

        <div className="text-center mt-6 text-gray-700">
          <p>Already have an account? <a href="/login" className="text-red-600 hover:underline">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
