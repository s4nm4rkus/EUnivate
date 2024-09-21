import Quotation from '../models/quotationModel.js';
import quotationTokenModel from "../models/quotationTokenModel.js";
import nodemailer from 'nodemailer';
import crypto from "crypto";
import verifyQuotationEmail from '../utils/jwtUtils.js';
import cors from 'cors';

// Configure specific CORS options
const corsOptions = {
    origin: 'https://eunivate.vercel.app',  // Only allow this origin
    methods: 'GET, POST, OPTIONS',  // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'],  // Allow specific headers
};

export const createQuotation = async (req, res) => {
    cors(corsOptions)(req, res, async () => {
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
            const verificationLink = `${process.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/quotation/confirm/${quotationToken.quotationToken}`;

            // Send the verification email
            try {
                await verifyQuotationEmail(email, verificationLink);
                console.log('Verification email sent successfully.');

                res.status(201).json({
                    message: 'Quotation saved successfully, verification email sent, and completion email sent.',
                    quotation,
                });
            } catch (emailError) {
                console.error('Mail send failed:', emailError);
                res.status(500).json({
                    message: 'Quotation saved but failed to send verification or completion email',
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
    });
};

// You can similarly apply CORS to other endpoints if needed
export const confirmQuotationEmail = async (req, res) => {
    cors(corsOptions)(req, res, async () => {
        try {
            const quotationToken = await quotationTokenModel.findOne({
                quotationToken: req.params.quotationToken,
            });

            if (!quotationToken) {
                return res.status(400).send("Invalid or expired token.");
            }

            const quotation = await Quotation.findById(quotationToken.quotationId);

            if (!quotation) {
                return res.status(400).send("Quotation not found.");
            }

            await Quotation.updateOne(
                { _id: quotationToken.quotationId },
                { $set: { verified: true } }
            );
            
            await quotationTokenModel.findByIdAndDelete(quotationToken._id);

            res.redirect('/quotation-complete');

            const recipientEmail = 'eunivate@gmail.com'; 
            const subject = 'Quotation Request Completed';

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: recipientEmail,
                subject: subject,
                text: `
                You have a new quotation request from:

                Name: ${quotation.name}
                Company Name: ${quotation.company}
                Company Email: ${quotation.email}
                Contact Number: ${quotation.phone}

                Other info:

                Type of Service: ${quotation.service}
                Preferred Budget: ${quotation.budget}
                Additional Info: ${quotation.additionalInfo || 'N/A'}
                `,
            };

            await transporter.sendMail(mailOptions);
            console.log('Completion email sent successfully.');

        } catch (error) {
            console.error('Error verifying email:', error);
            res.status(400).send("An error occurred during email verification.");
        }
    });
};

export const checkVerificationStatus = async (req, res) => {
    cors(corsOptions)(req, res, async () => {
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
    });
};

export default { createQuotation, confirmQuotationEmail, checkVerificationStatus };

