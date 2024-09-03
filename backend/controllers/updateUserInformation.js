import User from "../models/userModels.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

// Generate JWT Token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Update user information
export const updateUser = async (req, res) => {
    const { id } = req.params;  // User ID passed as a parameter
    const { firstName, lastName, email, phoneNumber, username, profilePicture } = req.body; // Data to update

    try {
      // Find the user by ID and update their information
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          username,
          profilePicture, // If this is a URL to the profile picture
        },
        { new: true }  // Return the updated document
      );

      // Return the updated user information
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user information', error });
    }
};

// Update user password
export const updateUserPassword = async (req, res) => {
  const { id } = req.params;  // User ID passed as a parameter
  const { newPassword } = req.body; // Only the new password

  try {
      const user = await User.findById(id);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Return a success message
      res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error updating password', error });
  }
};
