import Quotation from '../models/quotationModel.js';
import quotationTokenModel from "../models/quotationTokenModel.js";
import crypto from "crypto";
import verifyQuotationEmail from '../utils/jwtUtils.js';

export const createQuotation = async (req, res) => {
    const { name, email, phone, company, service, budget, additionalInfo } = req.body;

    try {
        // Create and save the quotation
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

        // Generate a token and save it
        const quotationToken = new quotationTokenModel({
            quotationId: quotation._id.toString(),
            quotationToken: crypto.randomBytes(16).toString('hex'),
        });

        await quotationToken.save();
        console.log('Quotation token saved successfully:', quotationToken);

        // Create verification link
        const link = `http://localhost:5000/api/quotation/confirm/${quotationToken.quotationToken}`;

        // Send the verification email
        try {
            await verifyQuotationEmail(email, link);
            res.status(201).json({
                message: 'Quotation saved successfully and verification email sent.',
                quotation,
            });
        } catch (emailError) {
            console.error('Mail send failed:', emailError);
            res.status(500).json({
                message: 'Quotation saved but failed to send verification email',
                error: emailError.message,
            });
        }
    } catch (error) {
        console.error('Error saving quotation or token:', error);
        if (!res.headersSent) {
            res.status(400).json({
                message: 'Error saving quotation or token',
                error: error.message,
            });
        }
    }
};

export default { createQuotation };