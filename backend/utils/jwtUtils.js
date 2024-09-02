import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Quotation from '../models/quotationModel.js';
import { text } from 'express';

// Generate JWT Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to protect routes and verify token
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // Assuming the token contains the user's ID
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


const verifyQuotationEmail = async (email, link) => {
  try {
      // Create a transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: process.env.EMAIL_USER, // Your email address (from .env)
              pass: process.env.EMAIL_PASS, // Your email password (from .env)
          },
      });

      // Send email
      let info = await transporter.sendMail({
          from: `"Your Company Name" <${process.env.EMAIL_USER}>`, // Sender address
          to: email, // List of receivers
          subject: 'Quotation Verification', // Subject line
          text: `Please verify your quotation using the following link: ${link}`, // Plain text body
          html: `<p>Please verify your quotation using the following link: <a href="${link}">${link}</a></p>`, // HTML body
      });

      console.log('Verification email sent:', info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
      throw error;
  }
};

export default verifyQuotationEmail;
