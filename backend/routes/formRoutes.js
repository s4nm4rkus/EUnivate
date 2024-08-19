import express from 'express';
import { submitFormData } from '../controllers/formController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/submit', protect, submitFormData);

export default router;
