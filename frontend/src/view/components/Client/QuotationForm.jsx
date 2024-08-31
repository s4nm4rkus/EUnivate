import React, { useState } from 'react';

import {QuotationStep1, QuotationStep2, QuotationStep3, QuotationStep4} from '../../components/index.js'

const QuotationForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        additionalInfo: ''
    });

    // Function to go to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Function to go to the previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    // Function to handle form submission
    const submitForm = async () => {
        try {
            // Send formData to the backend
            const response = await fetch('http://localhost:5000/api/users/quotation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Handle the response
            if (response.ok) {
                const result = await response.json();
                console.log('Form Data Submitted Successfully:', result);

                // Optionally, reset the form and return to the first step
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    service: '',
                    budget: '',
                    additionalInfo: ''
                });
                setStep(1);
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Render the current step using if-else statements
    if (step === 1) {
        return (
            <QuotationStep1
                nextStep={nextStep}
                formData={formData}
                setFormData={setFormData}
            />
        );
    } else if (step === 2) {
        return (
            <QuotationStep2
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
            />
        );
    } else if (step === 3) {
        return (
            <QuotationStep3
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
            />
        );
    } else if (step === 4) {
        return (
            <QuotationStep4
                prevStep={prevStep}
                formData={formData}
                setFormData={setFormData}
                submitForm={submitForm}
            />
        );
    } else {
        return null;
    }
};

export default QuotationForm;
