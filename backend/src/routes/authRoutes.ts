import { Router } from "express";
import { login, register } from "../controller/authController";
import { validateLogin, validateRegistration } from "../middleware/validator";
import { authorize } from "../middleware/authMiddleware";

const authRoutes = Router();

authRoutes.post("/register",authorize(1), validateRegistration(), register);
authRoutes.post("/login", validateLogin(), login);

export default authRoutes;
