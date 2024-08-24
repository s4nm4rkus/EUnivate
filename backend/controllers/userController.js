  import User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Use the hashed password
      role,
    });

    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};
  // Login user
  export const loginUser = async (req, res) => {

  
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email});
  
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      const passwordCheck = await bcrypt.compare(password, user.password);
  
      if (!passwordCheck) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      const token = generateToken(user._id);
      res.status(200).json({
        message: 'Login successful!',
        email: user.email,
        token: token,
        role: user.role // Ensure this is correctly included
      });
      
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };

  //Forgot-Password Function

  export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpire = Date.now() + 3600000; // Token valid for 1 hour
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = resetTokenExpire;
      await user.save();
  
      // Send email with reset link
      const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
      const message = `You requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;
  
      await sendEmail({
        email: user.email,
        subject: 'Password Reset',
        message,
      });
  
      res.status(200).json({ message: 'Reset link sent to email' });
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Helper function to send email
  const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: 'eunivate@gmail.com',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
  
    await transporter.sendMail(mailOptions);
  };

  //Reset-Password
  export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      // Find the user by the reset token and ensure the token has not expired
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Remove the reset token and expiration since it's no longer needed
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      // Save the updated user object
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful!' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


// Test connection
export const testConnection = (req, res) => {
  res.status(200).json({ message: 'Connection successful!' });
};







