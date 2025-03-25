import express from 'express';
import { login, signup, verifyUser } from '../controller/auth.controller';
import { validateUser } from '../validations/user.validation';

const authRoutes = express.Router();
authRoutes.post('/login', login);
authRoutes.post('/signup',validateUser,signup);
authRoutes.get('/verify', verifyUser);

export default authRoutes;