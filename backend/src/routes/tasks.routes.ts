import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const task = new TaskController();

const taskRoutes = Router();

taskRoutes.post('/', task.store);
taskRoutes.get('/', task.index);
taskRoutes.get('/:id/show', task.show);
taskRoutes.delete('/:id/delete', task.delete);

export default taskRoutes;
