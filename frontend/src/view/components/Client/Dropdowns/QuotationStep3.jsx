// Step3.jsx
import React from 'react';

const QuotationStep3 = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleBudgetSelect = (budget) => {
        setFormData({ ...formData, budget });
    };

    return (
        <div className="step-container">
            <h2>Get a project quote</h2>
            <p>Please select the project budget range you have in mind.</p>

            <div className="budget-options">
                <div
                    className={`budget-option ${formData.budget === '₱5,000 - ₱10,000' ? 'selected' : ''}`}
                    onClick={() => handleBudgetSelect('₱5,000 - ₱10,000')}
                >
                    <p>₱5,000 - ₱10,000</p>
                </div>

                <div
                    className={`budget-option ${formData.budget === '₱10,000 - ₱20,000' ? 'selected' : ''}`}
                    onClick={() => handleBudgetSelect('₱10,000 - ₱20,000')}
                >
                    <p>₱10,000 - ₱20,000</p>
                </div>

                <div
                    className={`budget-option ${formData.budget === '₱20,000 - ₱50,000' ? 'selected' : ''}`}
                    onClick={() => handleBudgetSelect('₱20,000 - ₱50,000')}
                >
                    <p>₱20,000 - ₱50,000</p>
                </div>

                <div
                    className={`budget-option ${formData.budget === '₱50,000+' ? 'selected' : ''}`}
                    onClick={() => handleBudgetSelect('₱50,000+')}
                >
                    <p>₱50,000+</p>
                </div>
            </div>

            <div className="navigation-buttons">
                <button onClick={prevStep}>Previous step</button>
                <button onClick={nextStep}>Next step</button>
            </div>
        </div>
    );
};

export default QuotationStep3;
