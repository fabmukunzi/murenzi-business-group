import express from 'express';
import { login, resendVerification, signup, verifyUser } from '../controllers/auth.controller';
import { validateUser } from '../validations/user.validation';
import { checkUserExistence } from '../middlewares/checkUserExistence.middleware';

const authRoutes = express.Router();
authRoutes.post('/login', checkUserExistence,login);
authRoutes.post('/signup',validateUser,signup);
authRoutes.get('/verify', verifyUser);
authRoutes.post('/resend-verification', resendVerification);

export default authRoutes;