    import React, { useState } from 'react';
    import { Loginback } from '../../../constants/assets';
    import { Link, useNavigate } from 'react-router-dom';

    const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [showPassword, setShowPassword] = useState(false);
      const [error, setError] = useState(''); // State for error message
      const navigate = useNavigate();

      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      
        const handleLogin = async () => {
          try {
            const res = await fetch('http://localhost:5000/api/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
      
            const data = await res.json();
            console.log(data); // Check the response
            if (res.ok) {
              // Save user details to localStorage
              localStorage.setItem('user', JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                token: data.token,
                role: data.role,
              }));
      
              const role = data.role.toLowerCase(); // Ensure 'data.role' is accessed correctly
              if (role === 'superadmin') {
                navigate('/superadmin');
              } else if (role === 'admin') {
                navigate('/admin');
              } else if (role === 'collaborator') {
                navigate('/collaborator-dashboard');
              } else if (role === 'user') {
                navigate('/');
              } else {
                console.error('Unknown role:', data.role);
              }
            } else {
              console.error('Login failed:', data.message);
              setError(data.message); 
            }
          } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred while trying to log in. Please try again later.');
          }
        };
      
      return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Loginback})` }}>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
            {error && <p className="text-red-600 mb-4">{error}</p>}
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
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={togglePasswordVisibility} className="absolute right-3 top-9 cursor-pointer text-gray-500">
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-gray-700 text-sm">Remember me</label>
              </div>
              <Link to="/forgot" className="text-sm text-red-600 hover:underline">Forgot Password?</Link>
            </div>
            <button className="w-full bg-yellow-500 text-white p-3 rounded-lg shadow hover:bg-yellow-600 transition duration-300" onClick={handleLogin}>
              Login
            </button>
            <div className="text-center mt-6 text-gray-700">
              <p>
                Don’t have an account? <Link to="/signup" className="text-red-600 hover:underline">SIGN UP</Link>
              </p>
            </div>
          </div>
        </div>
      );
    };

    export default Login;
