import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import ImportantController from '../controllers/ImportantController';
import CompleteTaskController from '../controllers/CompleteTaskController';

const task = new TaskController();
const important = new ImportantController();
const completeTask = new CompleteTaskController();

const taskRoutes = Router();

taskRoutes.post('/', task.store);
taskRoutes.get('/', task.index);
taskRoutes.get('/:id/show', task.show);
taskRoutes.put('/:id/update', task.update);
taskRoutes.delete('/:id/delete', task.delete);

taskRoutes.post('/importants/:id', important.store);
taskRoutes.get('/importants', important.getAll) ;

taskRoutes.get('/completed', completeTask.getAll);
taskRoutes.post('/completed/:id', completeTask.store);


export default taskRoutes;
