import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

// Hard-code the port number
const port = 5000;

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Routes
app.use('/api/user', userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`));
