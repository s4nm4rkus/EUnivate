// Created API end-pont for the updating Profile picture for the admin

import User from '../models/userModels.js';
import jwt from 'jsonwebtoken';


export const updateUserProfilePicture = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed as a parameter
    const { profilePicture } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.profilePicture = profilePicture || user.profilePicture; // Update profile picture
      await user.save();
  
      res.status(200).json({
        message: 'Profile picture updated successfully!',
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      res.status(500).json({ message: 'Error updating profile picture', error });
    }
  };
  