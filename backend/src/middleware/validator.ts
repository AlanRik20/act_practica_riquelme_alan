import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { checkEmailExists } from '../service/userService';

const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Reglas para el registro
export const validateRegistration = (): (ValidationChain | ((req: Request, res: Response, next: NextFunction) => any))[] => [
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido'),
  body('email')
    .isEmail().withMessage('Debe ser un email válido'),
    body('email').custom(async (value) => {
      const userExists = await checkEmailExists(value);
      if (userExists) {
        throw new Error('Este email ya está registrado');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 3 }).withMessage('La contraseña debe tener al menos 3 caracteres'),
  handleValidation
];

// Reglas para el login
export const validateLogin = (): (ValidationChain | ((req: Request, res: Response, next: NextFunction) => any))[] => [
  body('email')
    .isEmail().withMessage('El email es inválido'),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida'),
  handleValidation
];