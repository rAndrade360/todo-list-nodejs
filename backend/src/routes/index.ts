import { Router } from 'express';
import userRoutes from './users.routes';
import AuthMiddleware from '../middlewares/authMiddleware';

const routes = Router();
const auth = new AuthMiddleware();

routes.use('/users', userRoutes);

routes.use(auth.execute);
routes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default routes;
