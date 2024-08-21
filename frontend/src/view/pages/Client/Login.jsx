import React, { useState } from 'react';
import { Loginback } from '../../../constants/assets';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      // Navigate based on user role
      if (data.role === 'superadmin') {
        navigate('/superadmin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      console.error('Login failed:', data.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Loginback})` }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Placeholder"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
          <p className="text-xs text-gray-500 mt-2">Your email must be a company email</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-700 text-sm">Remember me</label>
          </div>
          <Link to="/forgot" className="text-sm text-red-600 hover:underline">Forgot Password?</Link>
        </div>

        <button
          className="w-full bg-yellow-500 text-white p-3 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="text-center mt-6 text-gray-700">
          <p>Don’t have an account? <Link to="/signup" className="text-red-600 hover:underline">SIGN UP</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
