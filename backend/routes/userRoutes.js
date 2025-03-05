import express from 'express';
import * as user from '../controllers/userController.js';

const router = express.Router();

router.get('/u/:id', user.getSingleUser);

router.post('/register', user.register);

router.post('/otp-verification', user.verifyEmail);

router.post('/login', user.login);

export default router;
