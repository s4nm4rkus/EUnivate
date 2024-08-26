import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors(
  {
    origin: ['https://e-univate-5zup.vercel.app'],
    methods: {'POST' : 'GET'},
    credentials: true
  }
));
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

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

