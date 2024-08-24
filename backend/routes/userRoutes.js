import express from 'express';
import { getUsers, createUser, loginUser, forgotPassword, resetPassword} from '../controllers/userController.js';
import { protect } from '../utils/jwtUtils.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.post('/forgot-password', forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get('/', protect, getUsers);  // Protect this route to require authentication


export default router;
