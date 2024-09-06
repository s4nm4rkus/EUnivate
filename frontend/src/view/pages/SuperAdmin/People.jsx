import React, { useState, useEffect } from 'react';
import '../../../admin.css';
import AdminNavbar from '../../components/SuperAdmin/adminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../constants/assets';

const People = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ firstName: '', lastName: '', role: '', email: '', avatar: '' });
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState(''); // Track the selected role
    const [selectedEmails, setSelectedEmails] = useState([]); // Track selected emails in modal

    // Fetch users from the backend
    const fetchUsers = async (role = '') => {
        try {
            const response = await fetch(`http://localhost:5000/api/users${role ? `?role=${role}` : ''}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
    
            const users = await response.json();
            setAllUsers(users);
            setFilteredUsers(users); // Initialize filteredUsers with all users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch all users on component mount
    }, []);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    const toggleRoleDropdown = (userId) => {
        setIsRoleDropdownOpen((prev) => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };


    
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setSelectedRole(''); // Reset the selected role when the modal is closed
            setFilteredUsers(allUsers); // Reset the filtered users to all users
            setSelectedEmails([]); // Clear selected emails
        }
    };

    const handleRoleFilter = (role) => {
        console.log('Selected role:', role);  // Log the selected role
        setSelectedRole(role);
        fetchUsers(role);  // Fetch users based on the selected role
    };

    const handleInvite = async () => {
        const role = selectedRole;  // Use the selected role for invitation
        const emails = selectedEmails.join(',');
    
        if (!emails) {
            console.error('No email provided');
            alert('Please select at least one email to invite.');
            return;
        }
    
        console.log(`Inviting users with role: ${role}, emails: ${emails}`);
    
        try {
            const response = await fetch('http://localhost:5000/api/users/invite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails, role }),  // Send both emails and role
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Invitation response:', result.message);
                alert(`Invitations sent to: ${emails}`);
                fetchUsers();  // Refresh the user list after inviting
                toggleModal();  // Close the modal
            } else {
                const errorResponse = await response.json();
                console.error('Error inviting users:', errorResponse);
                alert(`Error inviting users: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error('Error inviting users:', error.message);
            alert(`An error occurred: ${error.message}`);
        }
    };
    
    const handleRoleChange = async (newRole, userId) => {
        console.log(`Changing role of user with ID ${userId} to ${newRole}`);
    
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
    
            if (response.ok) {
                
                const updatedUser = await response.json();
                console.log('Role change successful:', updatedUser);
    
                // Ensure you are using the correct property to compare and update the user
                setAllUsers(allUsers.map(user => user._id === updatedUser._id ? updatedUser : user));
    
                handleRoleFilter(selectedRole); // Re-apply the role filter after updating
    
                alert(`Changed role of ${updatedUser.firstName} ${updatedUser.lastName} to ${newRole}`);
            } else {
                const errorResponse = await response.json();
                console.error('Error updating role:', errorResponse);
            }
        } catch (error) {
            console.error('Error updating role:', error.message);
        } finally { 
            setIsRoleDropdownOpen(false);
        }
    };
    


    const handleEmailSelect = (email) => {
        setSelectedEmails(prev =>
            prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-medium text-gray-800">People</h1>
                <div className="flex items-center space-x-4">
                    <AdminNavbar 
                        isAccountDropdownOpen={isAccountDropdownOpen} 
                        toggleAccountDropdown={toggleAccountDropdown} 
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md mb-6">
                <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-gray-700">Member List</p>
                    <button 
                        className="bg-red-800 text-white px-4 py-2 rounded flex items-center hover:bg-red-900"
                        onClick={toggleModal}
                    >
                        <i className="fas fa-user-plus mr-2"></i>
                        Add Members
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                        <img 
                                            src={user.avatar || User}
                                            alt="Avatar" 
                                            className="w-12 h-12 rounded-full mr-4 object-cover"
                                        />
                                        <div>
                                            <div className="text-xl font-medium text-gray-900">
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500 relative">
                                        {user.role}
                                        <FontAwesomeIcon 
                                            icon={faChevronDown} 
                                            className="ml-2 cursor-pointer" 
                                            onClick={() => toggleRoleDropdown(user._id)}
                                        />
                                        {isRoleDropdownOpen[user._id] && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                <ul className="py-1">
                                                    <li 
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('Guest', user._id)}
                                                    >
                                                        Guest
                                                    </li>
                                                    <li 
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('member', user._id)}
                                                    >
                                                        Member
                                                    </li>
                                                    <li 
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('admin', user._id)}
                                                    >
                                                        Admin
                                                    </li>
                                                    <li 
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('superadmin', user._id)}
                                                    >
                                                        Superadmin
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        N/A
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                    No users found for the selected role.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                    <div className="relative bg-white w-1/2 rounded-lg p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium text-gray-900">Add Members</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={toggleModal}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search email"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <select 
                                className="ml-4 p-3 border rounded-lg"
                                onChange={(e) => handleRoleFilter(e.target.value)}
                                value={selectedRole}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="member">Member</option>
                                <option value="Guest">Guest</option>
                            </select>

                            <button 
                                className="ml-4 bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
                                onClick={handleInvite}
                            >
                                Invite
                            </button>
                        </div>

                        <div className="mt-4">
                            {filteredUsers.length > 0 ? (
                                <ul>
                                    {filteredUsers.map((user, index) => (
                                        <li 
                                            key={index} 
                                            className={`flex items-center justify-between p-2 border-b ${selectedEmails.includes(user.email) ? 'bg-gray-200' : ''}`} 
                                            onClick={() => handleEmailSelect(user.email)}
                                        >
                                            <div className="flex items-center">
                                                <img 
                                                    src={user.avatar || User}
                                                    alt="Avatar" 
                                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                                />
                                                <div>
                                                    <div className="text-lg text-gray-800">{user.firstName} {user.lastName}</div>
                                                    <div className="text-sm text-gray-600">{user.email}</div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">{user.role}</div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500">No users found for the selected role.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default People;
