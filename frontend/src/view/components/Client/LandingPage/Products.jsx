import React from 'react';

const Products = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-xl font-bold text-red-500">Products</h2>
        <br />
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <br />
        <p className='text-gray-800'> EUnivate is proud to feature innovative products developed by our talented student-professor teams.</p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="https://via.placeholder.com/400" alt="Product" className="w-full h-48 object-cover"/>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-700">Product Name</h2>
            <p className="text-gray-500 mt-2">Description of the product goes here.</p>
            <div className="mt-4">
              <span className="text-xl font-bold text-gray-800">$99.99</span>
            </div>
          </div>
        </div>
        {/* Repeat Product Card as needed */}
      </div>
    </div>
  );
};

export default Products;
