import express from 'express';
import { getMessages, sendMessage } from '../controllers/chatMessageController.js';

const router = express.Router();

// Route to get all messages
router.get('/', getMessages); // Use the async handler directly

// Route to send a new message
router.post('/', sendMessage); // Use the async handler directly

export default router;
