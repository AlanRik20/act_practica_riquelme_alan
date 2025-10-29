// src/service/authService.ts

import * as userService from './userService';
import { User } from '../models/IUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (userData: any): Promise<User> => {
  // 1. Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  // 2. Reemplazar la contraseña en texto plano por la hasheada
  const dataToSave = {
    ...userData,
    password: hashedPassword,
  };

  // 3. Llamar al userService para crear el usuario
  // (Asegúrate que tu userService.createUser espera este objeto)
  const user = await userService.createUser(dataToSave);
  
  // No devolvemos la contraseña
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const login = async (email: string, pass: string): Promise<string> => {
  // 1. Encontrar al usuario por email
  // (Debes crear esta función en tu userService)
  const user = await userService.getUserByEmail(email); 
  if (!user) {
    throw new Error('Credenciales inválidas'); // Error genérico
  }

  // 2. Comparar la contraseña
  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas'); // Error genérico
  }

  // 3. Crear el payload del token
  const payload = {
    id: user.id,
    email: user.email,
    // puedes agregar roles u otra info
  };

  // 4. Firmar y devolver el token
  // ¡Guarda tu 'SECRET_KEY' en variables de entorno!
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'TU_SECRET_KEY_PROVISORIA', {
    expiresIn: '1h', // El token expira en 1 hora
  });

  return token;
};