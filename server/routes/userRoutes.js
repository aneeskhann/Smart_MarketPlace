import express from 'express'
import { login, signup, getUsers, deleteUser, updateUser } from '../controllers/userController.js';
import { authenticateToken } from './authentication/Authentication.js';

const router = express.Router();



// Route for user signup
router.post('/signup', signup);

router.post('/login', login);

router.get('/user', authenticateToken, getUsers)

router.delete('/user/:userId', deleteUser)

router.put('/user/:userId', updateUser)

export default router
