import crypto from 'crypto';
import User from '../models/userModels.js';
import sendEmail from '../utils/sendEmail.js'; // The utility function you just created

// Controller to enable Two-Factor Authentication
export const enableTwoFactorAuth = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a token for 2FA
    const twoFactorToken = crypto.randomBytes(20).toString('hex');

    user.twoFactorToken = twoFactorToken;
    user.twoFactorTokenExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    await user.save();

    // Send the token via email
    const verifyUrl = `http://localhost:5173/verify-2fa/${twoFactorToken}`;
    const message = `Click the following link to enable Two-Factor Authentication: ${verifyUrl}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Enable Two-Factor Authentication',
      message,
    });

    res.status(200).json({ message: 'Verification email sent for Two-Factor Authentication' });
  } catch (error) {
    console.error('Error enabling 2FA:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to verify Two-Factor Authentication
export const verifyTwoFactorAuth = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      twoFactorToken: token,
      twoFactorTokenExpire: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.twoFactorEnabled = true;
    user.twoFactorToken = undefined;
    user.twoFactorTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Two-Factor Authentication enabled successfully!' });
  } catch (error) {
    console.error('Error verifying 2FA:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
//Disbaled 2FA
export const disableTwoFactorAuth = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.twoFactorEnabled = false;
        user.twoFactorToken = undefined;
        user.twoFactorTokenExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Two-Factor Authentication disabled successfully!' });
    } catch (error) {
        console.error('Error disabling 2FA:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
