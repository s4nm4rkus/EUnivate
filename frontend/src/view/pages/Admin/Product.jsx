import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Admin/AdminContainer';  
import { useNavigate } from 'react-router-dom';
import EditProductModal from '../../components/Admin/EditProductModal';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (updatedProduct) => {
    setProducts(products.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
    ));
};

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              <tr key={product._id} className="border-b">
                <td className="py-4 px-6">{product.productName}</td>
                <td className="py-4 px-6">{product.description}</td>
                <td className="py-4 px-6">
                  {product.image && product.image.url ? (
                    <img
                      src={product.image.url}
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      product.availability === "Available"
                        ? "bg-teal-100 text-teal-700"
                        : product.availability === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.availability}
                  </button>
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    className="mr-2 text-gray-600 hover:text-gray-900"
                    onClick={() => handleEdit(product)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button 
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
};

export default Product;
