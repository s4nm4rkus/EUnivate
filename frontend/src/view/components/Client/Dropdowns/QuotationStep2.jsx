
import React from 'react';

const QuotationStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleServiceSelect = (service) => {
        setFormData({ ...formData, service });
    };

    return (
        <div className="step-container">
            <h2>Get a project quote</h2>
            <p>Please select which service you are interested in.</p>

            <div className="services-options">
                <div
                    className={`service-option ${formData.service === 'Development' ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect('Development')}
                >
                    <img src="/path/to/development-icon.png" alt="Development" />
                    <p>Development</p>
                </div>

                <div
                    className={`service-option ${formData.service === 'Web Design' ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect('Web Design')}
                >
                    <img src="/path/to/web-design-icon.png" alt="Web Design" />
                    <p>Web Design</p>
                </div>

                <div
                    className={`service-option ${formData.service === 'Marketing' ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect('Marketing')}
                >
                    <img src="/path/to/marketing-icon.png" alt="Marketing" />
                    <p>Marketing</p>
                </div>

                <div
                    className={`service-option ${formData.service === 'Other' ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect('Other')}
                >
                    <img src="/path/to/other-icon.png" alt="Other" />
                    <p>Other</p>
                </div>
            </div>

            <div className="navigation-buttons">
                <button onClick={prevStep}>Previous step</button>
                <button onClick={nextStep}>Next step</button>
            </div>
        </div>
    );
};

export default QuotationStep2;
