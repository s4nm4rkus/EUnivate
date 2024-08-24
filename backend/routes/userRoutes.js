import express from 'express';
import { getUsers, createUser, loginUser } from '../controllers/userController.js';
import { protect } from '../utils/jwtUtils.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.get('/', protect, getUsers);  // Protect this route to require authentication

export default router;
