import User from '../models/userModels.js';
import sendEmail from '../utils/sendEmail.js'; 

// Controller to enable Two-Factor Authentication using OTP
export const enableTwoFactorAuth = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    // Send the OTP via email
    const message = `Your OTP for enabling Two-Factor Authentication is: ${otp}`;

    await sendEmail({
      email: user.email,
      subject: 'Enable Two-Factor Authentication',
      message,
    });

    res.status(200).json({ message: 'OTP sent for Two-Factor Authentication' });
  } catch (error) {
    console.error('Error enabling 2FA:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to verify Two-Factor Authentication using GET request
export const verifyOtpFor2FA = async (req, res) => {
  const { id } = req.params;
  const { otp } = req.query; // Expect OTP to be in query parameters

  try {
    const user = await User.findById(id);

    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.twoFactorEnabled = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Two-Factor Authentication enabled successfully!', twoFactorEnabled: true });
  } catch (error) {
    console.error('Error verifying OTP for 2FA:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to disable Two-Factor Authentication
export const disableTwoFactorAuth = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        console.log('User not found:', userId);
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.twoFactorEnabled = false;
      user.otp = undefined;
      user.otpExpire = undefined;
      await user.save();
  
      console.log('Two-Factor Authentication disabled:', user.twoFactorEnabled);
  
      res.status(200).json({ message: 'Two-Factor Authentication disabled successfully.', twoFactorEnabled: user.twoFactorEnabled });
    } catch (error) {
      console.error('Error disabling 2FA:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };