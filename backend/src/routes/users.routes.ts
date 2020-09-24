import { Router } from 'express';
import UserController from '../controllers/UserController';

const user = new UserController();

const userRoutes = Router();

userRoutes.post('/', user.store);

export default userRoutes;
