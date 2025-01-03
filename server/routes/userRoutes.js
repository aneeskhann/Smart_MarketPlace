import express from 'express'
import { login, signup, getUsers, deleteUser,logout, updateUser,addUser } from '../controllers/userController.js';
import { authenticateToken } from './authentication/Authentication.js';

const router = express.Router();



// Route for user signup
router.post('/signup', signup);

router.post('/login', login);
router.post('/logout', logout);

router.get('/user', authenticateToken, getUsers)

router.delete('/user/:userId', deleteUser)
router.post('/user',addUser)
router.put('/user/:userId', updateUser)

export default router
