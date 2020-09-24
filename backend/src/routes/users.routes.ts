import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';

const user = new UserController();
const session = new SessionController();

const userRoutes = Router();

userRoutes.post('/', user.store);
userRoutes.post('/login', session.login);

export default userRoutes;
