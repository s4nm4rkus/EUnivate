import React from 'react';

const QuotationStep3 = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleBudgetSelect = (budget) => {
        setFormData({ ...formData, budget });
    };

    return (
        <>
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">Get a project quote</h2>
            <p className="text-gray-500 mt-2 text-center">
                Please select the project budget range you have in mind.
            </p>
            
 
            
            {/* Budget Selection Container */}
            <div className="w-full max-w-lg mx-auto mt-8">
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <div className="flex items-center space-x-2">
                    <div className="h-1 w-16 bg-gray-300"></div>
                    <div className="h-1 w-16 bg-gray-300"></div>
                        <div className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full">
                            3
                        </div>
                        <div className="h-1 w-16 bg-red-600"></div>
                    </div>
          
                    <div className="h-1 w-16 bg-gray-300"></div>
                   
                </div>
                <hr className="my-4 border-t-2 border-gray-200" />
                <br />
               
                    <h1 className = "font-semibold mb-3 text-xl text-gray-800">What's Your Project Budget?</h1>
                    <p className='mb-5 text-gray-800'>Please select the project budget range you have in mind.</p>
             
                <div className="grid grid-cols-2 gap-4">
                    <div
                        className={`p-7 border-2 rounded-xl cursor-pointer flex items-center ${formData.budget === '₱5,000 - ₱10,000' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleBudgetSelect('₱5,000 - ₱10,000')}
                    >
                        <input
                            type="radio"
                            name="budget"
                            value="₱5,000 - ₱10,000"
                            checked={formData.budget === '₱5,000 - ₱10,000'}
                            onChange={(e) => handleBudgetSelect(e.target.value)}
                            className="form-radio text-red-500 mr-3"
                        />
                        <p className="font-semibold text-gray-700">₱5,000 - ₱10,000</p>
                    </div>

                    <div
                        className={`p-7 border-2 rounded-xl cursor-pointer flex items-center ${formData.budget === '₱10,000 - ₱20,000' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleBudgetSelect('₱10,000 - ₱20,000')}
                    >
                        <input
                            type="radio"
                            name="budget"
                            value="₱10,000 - ₱20,000"
                            checked={formData.budget === '₱10,000 - ₱20,000'}
                            onChange={(e) => handleBudgetSelect(e.target.value)}
                            className="form-radio text-red-500 mr-3"
                        />
                        <p className="font-semibold text-gray-700">₱10,000 - ₱20,000</p>
                    </div>

                    <div
                        className={`p-7 border-2 rounded-xl cursor-pointer flex items-center ${formData.budget === '₱20,000 - ₱50,000' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleBudgetSelect('₱20,000 - ₱50,000')}
                    >
                        <input
                            type="radio"
                            name="budget"
                            value="₱20,000 - ₱50,000"
                            checked={formData.budget === '₱20,000 - ₱50,000'}
                            onChange={(e) => handleBudgetSelect(e.target.value)}
                            className="form-radio text-red-500 mr-3"
                        />
                        <p className="font-semibold text-gray-700">₱20,000 - ₱50,000</p>
                    </div>

                    <div
                        className={`p-7 border-2 rounded-xl cursor-pointer flex items-center ${formData.budget === '₱50,000+' ? 'border-red-500' : 'border-gray-200'}`}
                        onClick={() => handleBudgetSelect('₱50,000+')}
                    >
                        <input
                            type="radio"
                            name="budget"
                            value="₱50,000+"
                            checked={formData.budget === '₱50,000+'}
                            onChange={(e) => handleBudgetSelect(e.target.value)}
                            className="form-radio text-red-500 mr-3"
                        />
                        <p className="font-semibold text-gray-700">₱50,000+</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-between">
                    <button
                        onClick={prevStep}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-300"
                    >
                        Previous step
                    </button>
                    <button
                        onClick={nextStep}
                        className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition duration-300"
                    >
                        Next step
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuotationStep3;
