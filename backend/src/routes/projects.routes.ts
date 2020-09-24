import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const project = new ProjectController();

const projectRoutes = Router();

projectRoutes.post('/', project.store);
projectRoutes.get('/', project.index);


export default projectRoutes;
