  import User from '../models/userModels.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js';


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

// Test connection
export const testConnection = (req, res) => {
  res.status(200).json({ message: 'Connection successful!' });
};







