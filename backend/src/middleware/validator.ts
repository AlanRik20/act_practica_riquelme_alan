import { body, validationResult, ValidationChain, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { checkEmailExists } from '../service/userService';
import pool from '../database/db'; // Necesario para validar FKs o unicidad si queremos

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


// Validaciones para CREAR un equipo (POST)
export const validateCreateEquipo = [
  body('nombre')
    .trim().notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('El nombre no puede exceder 100 caracteres'),
  
  body('marca')
    .trim().notEmpty().withMessage('La marca es obligatoria')
    .isLength({ max: 50 }).withMessage('La marca no puede exceder 50 caracteres'),
  
  body('modelo')
    .trim().notEmpty().withMessage('El modelo es obligatorio')
    .isLength({ max: 50 }).withMessage('El modelo no puede exceder 50 caracteres'),
  
  body('numero_serie')
    .trim().notEmpty().withMessage('El número de serie es obligatorio')
    .isAlphanumeric().withMessage('El número de serie solo puede contener letras y números')
    .custom(async (value) => {
       // Validación personalizada de UNICIDAD
       const result = await pool.query('SELECT 1 FROM equipos WHERE numero_serie = $1', [value]);
       if (result.rowCount && result.rowCount > 0) {
         throw new Error('El número de serie ya está registrado');
       }
       return true;
    }),

  body('responsable_id')
    .optional({ nullable: true }) // Puede ser null o no enviarse
    .isInt().withMessage('El ID del responsable debe ser un número entero')
    .custom(async (value) => {
      if (value === null) return true;
      // Validar que el usuario existe (Integridad Referencial)
      const result = await pool.query('SELECT 1 FROM usuarios WHERE id_usuario = $1', [value]); // Asume tabla 'usuarios' y PK 'id_usuario'
      if (result.rowCount === 0) {
        throw new Error('El usuario responsable no existe');
      }
      return true;
    }),

  handleValidation // IMPORTANTE: Siempre al final
];

// Validaciones para ACTUALIZAR un equipo (PUT)
// Son similares a crear, pero todos los campos son opcionales
export const validateUpdateEquipo = [
  param('id').isInt().withMessage('El ID del equipo debe ser un número entero'),
  
  body('nombre')
    .optional().trim().notEmpty().withMessage('El nombre no puede estar vacío'),
    // ... puedes repetir las longitudes si quieres ser estricto

  body('numero_serie')
    .optional().trim().notEmpty()
    .custom(async (value, { req }) => {
       // Para actualizar, verificamos unicidad EXCLUYENDO al equipo actual
       const id = req.params?.id;
       const result = await pool.query('SELECT 1 FROM equipos WHERE numero_serie = $1 AND id_equipo != $2', [value, id]);
       if (result.rowCount && result.rowCount > 0) {
         throw new Error('El número de serie ya está en uso por otro equipo');
       }
       return true;
    }),

  body('responsable_id')
     .optional({ nullable: true })
     .isInt().withMessage('ID de responsable inválido'),
     // Podrías repetir la validación de existencia de usuario aquí también

  handleValidation
];

// Validación simple para ID en params (para GET by ID y DELETE)
export const validateEquipoId = [
    param('id').isInt().withMessage('El ID debe ser un número entero válido'),
    handleValidation
];