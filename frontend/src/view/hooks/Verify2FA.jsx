import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify2FA = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerify2FA = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/users/verify-2fa/${token}`);

      if (response.status === 200) {
        setSuccess('Two-Factor Authentication enabled successfully!');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful verification
        }, 2000);
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred while verifying Two-Factor Authentication.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleVerify2FA();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Verifying Two-Factor Authentication</h2>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        {loading && (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 text-red-800" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p className="ml-2 text-red-800">Verifying...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify2FA;