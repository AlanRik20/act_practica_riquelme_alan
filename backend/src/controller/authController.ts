import { request, Request, Response } from "express";
import * as authService from "../service/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};
