import * as userService from './userService';
import { User } from '../models/IUser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../helpers/jwt';

export const register = async (userData: any): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const dataToSave = {
    ...userData,
    password: hashedPassword,
  };

  const user = await userService.createUser(dataToSave);
  
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const login = async (email: string, pass: string): Promise<string> => {
  const user = await userService.getUserByEmail(email); 
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    rol_id: user.rol_id, 
  });

  return token;
};