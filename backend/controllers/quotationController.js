import Quotation from '../models/quotationModel.js';

export const createQuotation = async (req, res) => {
    const { name, email, phone, company, service, budget, additionalInfo } = req.body;

    try {
        // Create a new quotation document with the received data
        const quotation = new Quotation({
            name,
            email,
            phone,
            company,
            service,
            budget,
            additionalInfo,
        });

        // Save the document to the database
        await quotation.save();

        // Send a success response with the saved quotation
        res.status(201).json({
            message: 'Quotation saved successfully',
            quotation,
        });
    } catch (error) {
        // Handle any errors that occur during saving
        res.status(400).json({
            message: 'Error saving quotation',
            error,
        });
    }
};


export default { createQuotation };