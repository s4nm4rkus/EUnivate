import User from '../models/userModels.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,  // Ideally, you should hash the password before saving
      role,
    });

    const createdUser = await user.save();

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (password === user.password)) {
      res.status(200).json({ message: 'Login successful!', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Test connection
export const testConnection = (req, res) => {
  res.status(200).json({ message: 'Connection successful!' });
};
