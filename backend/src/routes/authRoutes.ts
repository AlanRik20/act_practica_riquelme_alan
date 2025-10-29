// src/routes/authRoutes.ts

import { Router } from 'express';

import * as authController from '../controller/authController'
const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);

export default authRoutes;