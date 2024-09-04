import User from '../models/userModels.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtils.js';



export const verifyTwoFactorAuth = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.twoFactorToken !== otp || user.twoFactorTokenExpire < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.twoFactorEnabled = true;
    user.twoFactorToken = undefined;
    user.twoFactorTokenExpire = undefined;
    await user.save();

    // Optionally generate and return JWT tokens after successful OTP verification
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({ 
      message: 'OTP verified successfully. You can now log in.', 
      accessToken, 
      refreshToken 
    });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Controller to verify OTP during login

export const verifyLoginOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.twoFactorToken !== otp || user.twoFactorTokenExpire < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.twoFactorToken = undefined;
    user.twoFactorTokenExpire = undefined;
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken.push(refreshToken);
    await user.save();

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
      role: user.role,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error verifying login OTP:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
