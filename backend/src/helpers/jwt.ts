// src/helpers/jwtHelper.ts
import jwt from 'jsonwebtoken';
import {TokenPayload} from '../models/ITokenPayload'

export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'clave_super_secreta';
  if (!secret) {
    throw new Error('FATAL: JWT_SECRET no está definido en las variables de entorno');
  }

  return jwt.sign(payload, secret, {
    expiresIn: '1h', // Puedes incluso mover esto a una variable de entorno (JWT_EXPIRES_IN)
  });
};