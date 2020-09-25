import { Router } from 'express';
import userRoutes from './users.routes';
import projectRoutes from './projects.routes';
import taskRoutes from './tasks.routes';
import AuthMiddleware from '../middlewares/authMiddleware';

const routes = Router();
const auth = new AuthMiddleware();

routes.use('/users', userRoutes);

routes.use(auth.execute);
routes.use('/projects', projectRoutes);
routes.use('/tasks', taskRoutes);


export default routes;
