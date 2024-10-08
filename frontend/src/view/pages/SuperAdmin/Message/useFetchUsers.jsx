import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.accessToken;

        if (!accessToken) {
          throw new Error('No access token found. Please log in again.');
        }

        // Fetch all users
        const usersResponse = await axios.get('http://localhost:5000/api/users/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Fetch invited users
        const invitedUsersResponse = await axios.get('http://localhost:5000/api/users/invited', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const users = usersResponse.data;
        const invited = invitedUsersResponse.data.invitedUsers;

        setAllUsers(users);
        setInvitedUsers(invited);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { allUsers, invitedUsers, loading, error };
};

export default useFetchUsers;
