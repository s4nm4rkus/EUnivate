import React, { useState } from 'react';
import axios from 'axios';
import { Loginback } from '../../../constants/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // Default role
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // For displaying errors
  const [success, setSuccess] = useState(""); // For displaying success message

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Clear any previous errors
      setSuccess(""); // Clear any previous success message

      try {
        const response = await axios.post("http://localhost:5000/api/users", {
          firstName,
          lastName,
          email,
          password,
          role
        });
        setSuccess("Account created successfully!"); // Display success message
        console.log(response.data);
        // Clear form fields after successful signup
        setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup."); // Display error message
      console.log(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Loginback})` }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="relative mt-4">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="relative mt-4">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white p-3 rounded-lg shadow hover:bg-yellow-600 transition duration-300 mt-6"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          <p>Already have an account? <a href="/login" className="text-red-600 hover:underline">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
