import Quotation from '../models/quotationModel.js';
import quotationTokenModel from "../models/quotationTokenModel.js";
import crypto from "crypto";
import verifyQuotationEmail from '../utils/jwtUtils.js';


// Create and save quotation, generate token, and send verification email
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
        const link = `http://localhost:5000/api/users/quotation/confirm/${quotationToken.quotationToken}`;

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

export const confirmQuotationEmail = async (req, res) => {
    try {
        const quotationToken = await quotationTokenModel.findOne({
            quotationToken: req.params.quotationToken,
        });

        if (!quotationToken) {
            return res.status(400).send("Invalid or expired token.");
        }

        await Quotation.updateOne(
            { _id: quotationToken.quotationId },
            { $set: { verified: true } }
        );
        
        await quotationTokenModel.findByIdAndDelete(quotationToken._id);
        res.redirect('/quotation-complete');
        
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(400).send("An error occurred during email verification.");
    }
};

// Check if the quotation is verified
export const checkVerificationStatus = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id);
        
        if (!quotation) {
            return res.status(404).json({ message: 'Quotation not found' });
        }

        res.json({ verified: quotation.verified });
    } catch (error) {
        console.error('Error checking verification status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export default { createQuotation, confirmQuotationEmail, checkVerificationStatus };