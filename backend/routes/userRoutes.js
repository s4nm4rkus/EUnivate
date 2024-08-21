import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/Users.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const name = `${firstName} ${lastName}`;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      // Save the user
      await user.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;
