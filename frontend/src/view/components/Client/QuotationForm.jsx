// import React, { useState } from 'react';
// import QuotationStep1 from './Dropdowns/QuotationStep1';
// import QuotationStep2 from './Dropdowns/QuotationStep2';
// import QuotationStep3 from './Dropdowns/QuotationStep3';
// import QuotationStep4 from './Dropdowns/QuotationStep4';





// const QuotationForm = () => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         company: '',
//         service: '',
//         budget: '',
//         additionalInfo: ''
//     });

//     const nextStep = () => {
//         setStep(step + 1);
//     };

//     const prevStep = () => {
//         setStep(step - 1);
//     };

//     const submitForm = async () => {
//         try {
//             console.log('Submitting form data:', formData); // Log form data
    
//             const response = await fetch('http://localhost:5000/api/users/quotation', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });
    
//             console.log('Server response:', response);
    
//             if (response.ok) {
//                 const result = await response.json();
//                 console.log('Form Data Submitted Successfully:', result);
    
                
//                 setFormData({
//                     name: '',
//                     email: '',
//                     phone: '',
//                     company: '',
//                     service: '',
//                     budget: '',
//                     additionalInfo: ''
//                 });
//                 setStep(1);
//             } else {
//                 console.error('Error submitting form:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error:', error); 
//         }
//     };

//     if (step === 1) {
//         return (
//             <QuotationStep1
//                 nextStep={nextStep}
//                 formData={formData}
//                 setFormData={setFormData}
//             />
//         );
//     } else if (step === 2) {
//         return (
//             <QuotationStep2
//                 nextStep={nextStep}
//                 prevStep={prevStep}
//                 formData={formData}
//                 setFormData={setFormData}
//             />
//         );
//     } else if (step === 3) {
//         return (
//             <QuotationStep3
//                 nextStep={nextStep}
//                 prevStep={prevStep}
//                 formData={formData}
//                 setFormData={setFormData}
//             />
//         );
//     } else if (step === 4) {
//         return (
//             <QuotationStep4
//                 prevStep={prevStep}
//                 submitForm={submitForm} 
//             />
//         );
//     } else {
//         return null;
//     }
// };

// export default QuotationForm;
