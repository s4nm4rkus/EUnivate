
// backend/index.js

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import saAddTask from './models/SuperAdmin/saAddTask.js';
import { confirmQuotationEmail } from './controllers/Client/quotationController.js';
import { addNewWorkspace } from './controllers/SuperAdmin/workspaceController.js';
import SelectedWorkspace from './models/SelectedWorkspace.js'; // Ensure this model is correctly imported

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://eunivate.vercel.app', 'https://localhost:5173'],
  methods: ["GET", "POST", "DELETE", "PATCH", "UPDATE"],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api', addNewWorkspace);

// Additional Routes
app.get('/api/users/workspaces/selected', async (req, res) => {
  try {
    const selectedWorkspaceRecord = await SelectedWorkspace.findOne().populate('selectedWorkspace'); // Ensure 'selectedWorkspace' is a valid field
    console.log("Fetched selected workspace record:", selectedWorkspaceRecord);
    if (!selectedWorkspaceRecord) {
      return res.status(404).json({ message: 'No selected workspace found' });
    }

    return res.status(200).json({ selectedWorkspaceRecord });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error fetching selected workspace' });
  }
});

// Chat message routes
app.get('/api/users/quotation/confirm/', confirmQuotationEmail);

app.get('/quotation-complete', (req, res) => {
  // Redirect to the client-side quotation completion page
  res.redirect(`https://eunivate.vercel.app/quotation-complete`);
});

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
  });
});

// Export the handler for Vercel
export default app;


