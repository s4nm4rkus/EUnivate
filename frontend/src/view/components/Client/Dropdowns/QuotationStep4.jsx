import React from 'react';
import { Step4 } from '../../../../constants/assets'; // Assuming you have this in your assets

const QuotationStep4 = ({  submitForm, prevStep }) => {
    return (
        <>
            {/* Header */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">Get a project quote</h2>
            <p className="text-gray-500 mt-2 text-center">
                Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 – 48 hours.
            </p>
            
            {/* Step Progress Indicator */}
            <div className="w-full max-w-lg mx-auto mt-8">
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <div className="flex items-center space-x-2">
                    <div className="h-1 w-16 bg-gray-300"></div>
                    <div className="h-1 w-16 bg-gray-300"></div>
                    <div className="h-1 w-16 bg-gray-300"></div>
                        <div className="h-1 w-16 bg-red-600"></div>
                        <div className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full">
                            4
                        </div>
                   
                    </div>
                
                </div>
                
                <hr className="my-4 border-t-2 border-gray-200" />
                <br />

                {/* Submission Icon and Text */}
                <div className="flex flex-col items-center justify-center mt-8 mb-8">
                    <img src={Step4} alt="Checkmark" className="w-24 h-24" />
                    <h1 className="font-semibold text-xl text-gray-800 mt-4">Submit your quote request</h1>
                    <p className="text-center text-gray-600 mt-4">
                        Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 – 48 hours.
                    </p>
                </div>
             
                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                    <button
                        onClick={prevStep}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition duration-300"
                    >
                        Previous step
                    </button>
                    <button
                        onClick={submitForm}
                        className="px-12 py-3 bg-yellow-500 text-white rounded-lg flex shadow hover:bg-yellow-600 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuotationStep4;
