import React, { useState, useEffect, useRef } from 'react';
import '../../../admin.css';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../constants/assets';

const People = () => {
    const [user, setUser] = useState({ profilePicture: { url: '' } });
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState({});
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [projects] = useState(['Project A', 'Project B', 'Project C']);
    const dropdownRef = useRef();
    const [loading, setloading] = useState(false);
    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const users = await response.json();
            setAllUsers(users);
            setFilteredUsers(users); // Initialize filteredUsers with all users

            // Update invited users' roles and profile pictures based on database data
            const storedInvitedUsers = JSON.parse(localStorage.getItem('invitedUsers')) || [];
            const updatedInvitedUsers = storedInvitedUsers.map((invitedUser) => {
                const userFromDB = users.find((user) => user.email === invitedUser.email);
                if (userFromDB) {
                    return {
                        ...invitedUser,
                        role: userFromDB.role,
                        profilePicture: userFromDB.profilePicture,
                    };
                }
                return invitedUser;
            });

            setInvitedUsers(updatedInvitedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();

        // Close dropdowns when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsRoleDropdownOpen({});
                setIsProjectDropdownOpen({});
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    const toggleRoleDropdown = (userEmail) => {
        setIsRoleDropdownOpen((prev) => ({
            ...prev,
            [userEmail]: !prev[userEmail],
        }));
    };

    const toggleProjectDropdown = (userEmail) => {
        setIsProjectDropdownOpen((prev) => ({
            ...prev,
            [userEmail]: !prev[userEmail],
        }));
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) {
            setSelectedRole('');
            setFilteredUsers(allUsers);
            setSelectedEmails([]);
        }
    };

    const handleRoleFilter = (role) => {
        console.log('Selected role:', role);
        setSelectedRole(role);

        if (role) {
            setFilteredUsers(allUsers.filter((user) => user.role.toLowerCase() === role.toLowerCase()));
        } else {
            setFilteredUsers(allUsers);
        }
    };

    const handleInvite = async () => {
        
        const emails = selectedEmails.join(',');

        if (!emails) {
            console.error('No email provided');
            alert('Please select at least one email to invite.');
            return;
        }

        console.log(`Inviting users with emails: ${emails}`);
        setloading(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/invite', {
                method: 'POST',
                headers: {    
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails }), // Only send emails, no role
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Invitation response:', result.message);

                // Add invited emails to invitedUsers state
                const newInvitedUsers = selectedEmails.map((email) => {
                    const userFromDB = allUsers.find((user) => user.email === email);
                    return {
                        email,
                        role: userFromDB ? userFromDB.role : 'Guest',
                        project: 'N/A',
                        profilePicture: userFromDB ? userFromDB.profilePicture : null,
                    };
                });
                const updatedInvitedUsers = [...invitedUsers, ...newInvitedUsers];
                setInvitedUsers(updatedInvitedUsers);

                // Store the updated invited users in local storage
                localStorage.setItem('invitedUsers', JSON.stringify(updatedInvitedUsers));

                selectedEmails.forEach((email) => {
                    alert(`Invitation sent to: ${email}`);
                });

                fetchUsers();
                toggleModal();
            } else {
                const errorResponse = await response.json();
                console.error('Error inviting users:', errorResponse);
                alert(`Error inviting users: ${errorResponse.message}`);
            }
        } catch (error) {
            setloading(false);
            console.error('Error inviting users:', error.message);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleRoleChange = async (newRole, userEmail) => {
        try {
            const user = allUsers.find((u) => u.email === userEmail);

            if (!user) {
                throw new Error(`User with email ${userEmail} not found`);
            }

            const response = await fetch(`http://localhost:5000/api/users/${user._id}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('Role change successful:', updatedUser);

                setInvitedUsers((prevUsers) => {
                    const updatedUsers = prevUsers.map((user) =>
                        user.email === userEmail ? { ...user, role: newRole } : user
                    );
                    localStorage.setItem('invitedUsers', JSON.stringify(updatedUsers));
                    return updatedUsers;
                });

                alert(`Role changed to ${newRole} and email notification sent to ${userEmail}`);
            } else {
                const errorResponse = await response.json();
                console.error('Error updating role:', errorResponse);
                alert(`Error updating role: ${errorResponse.message}`);
            }
        } catch (error) {
            console.error('Error updating role:', error.message);
            alert(`An error occurred: ${error.message}`);
        }
    };

    const handleProjectChange = (newProject, userEmail) => {
        setInvitedUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
                user.email === userEmail ? { ...user, project: newProject } : user
            );
            localStorage.setItem('invitedUsers', JSON.stringify(updatedUsers));
            return updatedUsers;
        });
    };

    const handleRemoveUser = (userEmail) => {
        const updatedUsers = invitedUsers.filter((user) => user.email !== userEmail);
        setInvitedUsers(updatedUsers);
        localStorage.setItem('invitedUsers', JSON.stringify(updatedUsers));
    };

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filtered = allUsers.filter(
            (user) =>
                user.email.toLowerCase().includes(searchQuery) ||
                user.firstName.toLowerCase().includes(searchQuery) ||
                user.lastName.toLowerCase().includes(searchQuery)
        );
        setFilteredUsers(filtered);
    };

    const handleEmailSelect = (email) => {
        setSelectedEmails((prev) =>
            prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
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
                    <p className="text-2xl font-semibold text-gray-700">Invited Members</p>
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invitedUsers.length > 0 ? (
                            invitedUsers.map((user, index) => (
                                <tr key={index} ref={dropdownRef}>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                        <img
                                            src={user.profilePicture?.url || user.profilePicture || User}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full mr-4 object-cover"
                                        />
                                        <div>
                                            <div className="text-xl font-medium text-gray-900">{user.email}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500 relative">
                                        {user.role}
                                        <FontAwesomeIcon
                                            icon={isRoleDropdownOpen[user.email] ? faChevronDown : faChevronRight}
                                            className="ml-2 cursor-pointer"
                                            onClick={() => toggleRoleDropdown(user.email)}
                                        />
                                        {isRoleDropdownOpen[user.email] && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                <ul className="py-1">
                                                    <li
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('Guest', user.email)}
                                                    >
                                                        Guest
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('member', user.email)}
                                                    >
                                                        Member
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('admin', user.email)}
                                                    >
                                                        Admin
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                        onClick={() => handleRoleChange('superadmin', user.email)}
                                                    >
                                                        Superadmin
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500 relative">
                                        {user.project}
                                        <FontAwesomeIcon
                                            icon={isProjectDropdownOpen[user.email] ? faChevronDown : faChevronRight}
                                            className="ml-2 cursor-pointer"
                                            onClick={() => toggleProjectDropdown(user.email)}
                                        />
                                        {isProjectDropdownOpen[user.email] && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                                <ul className="py-1">
                                                    {projects.map((project, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                                            onClick={() => handleProjectChange(project, user.email)}
                                                        >
                                                            {project}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                            onClick={() => handleRemoveUser(user.email)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    No invited users found.
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
                                onChange={handleSearch}
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
                                disabled={loading}
                            >
                                {loading ? 'Inviting' : 'Invite'}
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
                                                    src={user.profilePicture?.url || user.profilePicture || User}
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                                />
                                                <div>
                                                    <div className="text-lg text-gray-800">
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                    <div className="text-sm text-gray-600">{user.email}</div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">{user.role}</div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500">No users found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default People;
