import React from 'react';

const Quotation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Get a project quote</h2>
          <p className="text-gray-500">Please fill the form below to receive a quote for your project.<br/> Feel free to add as much detail as needed.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white">1</div>
          <div className="flex-grow h-px bg-gray-300 mx-2"></div>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">2</div>
          <div className="flex-grow h-px bg-gray-300 mx-2"></div>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">3</div>
          <div className="flex-grow h-px bg-gray-300 mx-2"></div>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-500">4</div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Contact details</h3>
          <p className="text-gray-500 mb-4">Please fill your information so we can get in touch with you.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input type="text" placeholder="Juan Dela Cruz" className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-user text-gray-400"></i>
              </div>
            </div>
            <div className="relative">
              <input type="email" placeholder="Email address" className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-envelope text-gray-400"></i>
              </div>
            </div>
            <div className="relative">
              <input type="text" placeholder="09123456789" className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-phone text-gray-400"></i>
              </div>
            </div>
            <div className="relative">
              <input type="text" placeholder="Company name" className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-building text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step Button */}
        <div className="mt-8">
          <button className="w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition duration-300">Next step</button>
        </div>
      </div>
    </div>
  );
};

export default Quotation;
