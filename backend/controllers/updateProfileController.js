// import User from '../models/userModels.js';
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
// import nodemailer from 'nodemailer';

// export const getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).select('-password');
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user profile', error });
//     }
// };

// export const updateUserProfile = async (req, res) => {
//     const { username, email, phoneNumber, profilePicture } = req.body;

//     try {
//         const user = await User.findById(req.user._id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         user.username = username || user.username;
//         user.email = email || user.email;
//         user.phoneNumber = phoneNumber || user.phoneNumber;
//         user.profilePicture = profilePicture || user.profilePicture;

//         const updatedUser = await user.save();
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating profile', error });
//     }
// };

// export const changePassword = async (req, res) => {
//     const { currentPassword, newPassword } = req.body;

//     try {
//         const user = await User.findById(req.user._id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(currentPassword, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Current password is incorrect' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);

//         await user.save();
//         res.status(200).json({ message: 'Password changed successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error changing password', error });
//     }
// };

// export const enableTwoFactorAuth = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Generate OTP and send it via email
//         const otp = crypto.randomBytes(3).toString('hex');
//         // Store the OTP in the user's record (for this example, we're just returning it, but you should store it and check later)
//         user.otp = otp; // Save OTP to user model for verification
//         await user.save();

//         // Send OTP via email
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: 'Your OTP for Two-Factor Authentication',
//             text: `Your OTP is ${otp}`,
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ message: 'Two-Factor Authentication enabled. Check your email for the OTP.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error enabling Two-Factor Authentication', error });
//     }
// };
