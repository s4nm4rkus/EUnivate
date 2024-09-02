import User from "../models/userModels.js";
import bcrypt from 'bcrypt';


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
    const { currentPassword, newPassword } = req.body; // Current and new password

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
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
