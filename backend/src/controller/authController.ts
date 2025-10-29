// src/controller/authController.ts

import { Request, Response } from 'express';
import * as authService from '../service/authService';

export const register = async (req: Request, res: Response) => {
  try {
    // El servicio ya se encarga de hashear
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    // Deberías manejar errores específicos (ej. email duplicado)
    res.status(400).json({ error: error.message || 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nombre, password } = req.body;
    if (!nombre || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    const token = await authService.login(nombre, password);
    
    // Devuelves el token al cliente
    res.json({ token });

  } catch (error: any) {
    // Error genérico para no dar pistas a atacantes
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};