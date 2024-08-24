import express from 'express';
import { getUsers, createUser, loginUser, forgotPassword, resetPassword } from '../controllers/userController.js';
import { protect, verifySuperAdmin } from '../middlewares/middleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/', createUser);
router.post('/forgot-password', forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protect and restrict access to superadmin route
router.get('/superadmin-dashboard', protect, verifySuperAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the SuperAdmin dashboard' });
});

router.get('/', protect, getUsers);  // Protect this route to require authentication

export default router;
