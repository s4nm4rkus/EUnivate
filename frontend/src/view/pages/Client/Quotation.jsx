

import React from "react";

const Quotation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Get a project quote</h2>
          <p className="text-gray-500">Please fill the form below to receive a quote for your project.<br/> Feel free to add as much detail as needed.</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Contact details</h3>
          <p className="text-gray-500 mb-4">Please fill your information so we can get in touch with you.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Juan Dela Cruz" 
                name="name"
                id="name"
                autocomplete="name"
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" 
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                name="email"
                id="email"
                autocomplete="email"
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" 
              />
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="09123456789" 
                name="phone"
                id="phone"
                autocomplete="tel"
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" 
              />
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Company name" 
                name="company"
                id="company"
                autocomplete="organization"
                className="w-full px-4 py-3 border rounded-full shadow-sm focus:ring focus:ring-opacity-50 focus:ring-yellow-500 outline-none text-gray-900" 
              />
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
