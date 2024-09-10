import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSearch, faTrash, faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Admin/AdminContainer';

const AdminDashboard = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/stats');
                const data = await response.json();
                setStats([
                    { label: 'Quotations', value: data.quotaions }, //may count nadin to wala lang laman db 
                    { label: 'Services', value: '4' },
                    { label: 'Products', value: data.products },
                    { label: 'Projects', value: data.projects },
                    { label: 'Webinars', value: data.webinars }
                    
                ]);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        fetchStats();
    }, []);

    const emails = [
        { sender: 'Juan Dela Cruz', subject: 'Quotation Subject – Lorem ipsum dolor sit amet, consect...', time: '8:38 AM', status: 'New' },
        { sender: 'Juan Dela Cruz', subject: 'Quotation Subject – Lorem ipsum dolor sit amet, consect...', time: '8:13 AM', status: 'Pending' },
        { sender: 'Juan Dela Cruz', subject: 'Quotation Subject – Lorem ipsum dolor sit amet, consect...', time: '7:52 PM', status: 'Pending' },
    ];

    const services = ['Services', 'Services', 'Services', 'Services', 'Services'];

    return (
        <Layout>
            {/* Statistics Section */}
            <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                {stats.map((stat, index) => (
                    <div key={index} className={`flex-1 text-center ${index !== stats.length - 1 ? 'border-r border-gray-200' : ''}`}>
                        <p className="text-gray-500">{stat.label}</p>
                        <h4 className="text-2xl font-bold text-red-700">{stat.value}</h4>
                 
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Emails Section */}
                <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search quotation"
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                        />
                        <div className="flex ml-4 space-x-3">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-500 cursor-pointer" />
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 cursor-pointer" />
                            <FontAwesomeIcon icon={faTrash} className="text-gray-500 cursor-pointer" />
                        </div>
                    </div>
                    {emails.map((email, index) => (
                        <div key={index} className="flex items-center border-b border-gray-200 py-4">
                            <input type="checkbox" className="mr-4" />
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-4" />
                            <p className="flex-1 truncate text-gray-700">{email.sender}</p>
                            <span
                                className={`px-3 py-1 rounded-full text-white mr-4 ${
                                    email.status === 'New' ? 'bg-teal-400' : 'bg-red-400'
                                }`}
                            >
                                {email.status}
                            </span>
                            <p className="flex-1 truncate text-gray-500">{email.subject}</p>
                            <p className="text-gray-500">{email.time}</p>
                        </div>
                    ))}
                </div>

                {/* Manage Services Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h6 className="text-gray-700 font-semibold">Manage Services</h6>
                        <select
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                            <option>Sort by</option>
                        </select>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left">
                                <th className="pb-2">Name</th>
                                <th className="pb-2 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-2">{service}</td>
                                    <td className="py-2 text-right space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
