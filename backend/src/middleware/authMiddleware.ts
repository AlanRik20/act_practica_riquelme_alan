// middleware/authJwt.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenHeader = req.header('Authorization');
  
  if (!tokenHeader) {
      return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  const token = tokenHeader.replace('Bearer ', '');

  try {
    const secret = process.env.JWT_SECRET || 'clave_super_secreta';

    const decoded = jwt.verify(token, secret);

    (req as any).user = decoded; 
    
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

export const authorize = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // USA (req as any) PARA QUE TYPESCRIPT NO SE QUEJE
    const user = (req as any).user; 

    if (!user) {
        return res.status(401).json({ message: "No autenticado" });
    }
    
    // Ahora 'user' tiene lo que guardaste en verifyToken (incluyendo rol_id)
    if (!allowedRoles.includes(user.rol_id)) {
      return res.status(403).json({ message: "Permiso denegado" });
    }
    
    return next();
  };
};