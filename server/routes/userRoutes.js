import express from 'express'
import { login, signup, getUsers, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Route for user signup
router.post('/signup', signup);

router.post('/login', login);

router.get('/user', getUsers)

router.delete('/user/:userId', deleteUser)

export default router
