// Step4.jsx
import React from 'react';

const QuotationStep4 = ({ formData, submitForm, prevStep }) => {
    return (
        <div className="step-container">
            <h2>Get a project quote</h2>
            <p>Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 – 48 hours.</p>

            <div className="submission-box">
                <div className="icon-check">
                    {/* Place your checkmark icon here */}
                    <img src="/path/to/checkmark-icon.png" alt="Checkmark" />
                </div>
                <p>Submit your quote request</p>
            </div>

            <div className="navigation-buttons">
                <button onClick={prevStep}>Previous step</button>
                <button onClick={submitForm}>Submit</button>
            </div>
        </div>
    );
};

export default QuotationStep4;
