import express from 'express';
import { getUsers, createUser, testConnection, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/test', testConnection);
router.post('/login', loginUser);

export default router;
