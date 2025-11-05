import { Router } from 'express';
import * as userController from '../controller/userController';
import { authorize, verifyToken } from '../middleware/authMiddleware';

const userRoutes = Router();
userRoutes.use(verifyToken)

userRoutes.post('/',authorize(1) ,userController.createUser);
userRoutes.get('/', authorize(1,2), userController.getUsers);
userRoutes.get('/obtenerEmail',authorize(1), userController.getUserByEmail)
userRoutes.get('/:id',authorize(1), userController.getUserById);
userRoutes.put('/:id',authorize(1,2), userController.updateUser);
userRoutes.delete('/:id',authorize(1) , userController.deleteUser);
export default userRoutes;
