import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import chatMessageRoutes from './routes/chatMessageRoutes.js'; // Ensure this path is correct

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

// Chat message routes
app.use('/api/messages', chatMessageRoutes); // Ensure this path is correct

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message, // Hide detailed error messages in production
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
