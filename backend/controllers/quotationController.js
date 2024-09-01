import Quotation from '../models/quotationModel.js';

export const createQuotation = async (req, res) => {
    const { name, email, phone, company, service, budget, additionalInfo } = req.body;

    try {
        const quotation = new Quotation({
            name,
            email,
            phone,
            company,
            service,
            budget, 
            additionalInfo,
        });

        await quotation.save();
        console.log('Quotation saved successfully:', quotation); 
        
        res.status(201).json({
        message: 'Quotation saved successfully',
            quotation,
        });
    } catch (error) {
        console.error('Error saving quotation:', error);
        res.status(400).json({
            message: 'Error saving quotation',
            error: error.message,
        });
    }
};


export default { createQuotation };