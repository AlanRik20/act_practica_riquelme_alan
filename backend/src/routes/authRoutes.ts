import { Router } from "express";
import { login, register } from "../controller/authController";



const authRoutes = Router();

import { validateLogin, validateRegistration } from "../middleware/validator";

authRoutes.post("/register", validateRegistration(), register);
authRoutes.post("/login", validateLogin(), login);

export default authRoutes;
