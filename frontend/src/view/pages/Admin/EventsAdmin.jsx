import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Admin/AdminContainer';  
import { useNavigate } from 'react-router-dom';

const EventsAdmin = () => {
  const navigate = useNavigate();

  const webinars = [
    { name: "Webinar Name", description: "Description", date: "DD/MM/YYYY", link: "Juan Delacruz" },
    { name: "Webinar Name", description: "Description", date: "DD/MM/YYYY", link: "Juan Delacruz" },
    // Add other webinars here
  ];

  return (
    <Layout>
      <div className="flex justify-end mb-4">
        <button 
          className="bg-red-700 text-white py-2 px-4 rounded-lg"
          onClick={() => navigate('/admin-addevents')}
        >
          Add Webinar
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-3/5">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Sort by</label>
          <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700">
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
          <button className="ml-2 p-2 text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg bg-white">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Webinar Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Date and Time</th>
              <th className="py-3 px-6 text-left">Embedded Link</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {webinars.map((webinar, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{webinar.name}</td>
                <td className="py-4 px-6">{webinar.description}</td>
                <td className="py-4 px-6">{webinar.date}</td>
                <td className="py-4 px-6">{webinar.link}</td>
                <td className="py-4 px-6 text-right">
                  <button className="mr-2 text-gray-600 hover:text-gray-900">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default EventsAdmin;
