import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Admin/AdminContainer';  
import { useNavigate } from 'react-router-dom'; // use 'react-router-dom' instead of 'react-router'

const Product = () => {
  const navigate = useNavigate();

  const products = [
    { name: "Product Name", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor...", image: "image.png", status: "Available" },
    // Add other products here
  ];

  return (
    <Layout>
      <div className="flex justify-end mb-4">
        <button 
          className="bg-red-700 text-white py-2 px-4 rounded-lg"
          onClick={() => navigate('/admin-addproducts')}
        >
          Add Products
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
            <option value="status">Status</option>
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
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{product.description}</td>
                <td className="py-4 px-6">
                  <img
                    src={product.image}
                    alt="Product"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="py-4 px-6">
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      product.status === "Available"
                        ? "bg-teal-100 text-teal-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {product.status}
                  </button>
                </td>
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

export default Product;
