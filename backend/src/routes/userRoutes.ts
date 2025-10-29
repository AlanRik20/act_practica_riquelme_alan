import { Router } from 'express';
import * as userController from '../controller/userController';

const userRoutes = Router();

userRoutes.post('/', userController.createUser);
userRoutes.get('/', userController.getUsers);
userRoutes.get('/obtenerEmail', userController.getUserByEmail)
userRoutes.get('/:id', userController.getUserById);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);
export default userRoutes;
