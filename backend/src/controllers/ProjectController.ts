import { Request, Response } from 'express';
import connection from '../database/connection';

export default class ProjectController {
  
  async store(request: Request, response: Response) {
    const { name} = request.body;
    const userId = response.locals.userId;
    try {
      const projectAlreadyExists = await connection('projects')
        .select('id')
        .where({ name, user_id: userId})
        .first();
      if (projectAlreadyExists)
        return response.status(400).json({ error: 'This project already exists' });

      const project = await connection('projects').insert({
        name,
        user_id: userId
      });
      return response.json({ project });
    } catch (error) {
      return response.status(500).json({ error: 'Could not register project' });
    }
  }

  async index(request: Request, response: Response) {
    const userId = response.locals.userId;

      try{

      const projects = await connection('projects')
        .select(
            'id',
            'name',
            'user_id',
            'created_at',
            'updated_at'
        ).where({user_id: userId});

      return response.json(projects);
      } catch(error) {
          return response.status(500).json({error: 'Could not get projects'});
      }
  }

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const userId = response.locals.userId;
    const {name} = request.body;
    
    try {
      await connection('projects').update({name}).where({id, user_id: userId});
      return response.json({success: "Updated successfully"});
    }catch(error){
      return response.status(500).json({error: 'Could not update'});
    }

  }

  async show(request: Request, response: Response) {
    const {id} = request.params;
    const userId = response.locals.userId;

    try{
      const project = await connection('projects').where('id', id).where('user_id', userId).first();
      return response.json(project);
    } catch(error) {
        return response.status(500).json({error: 'Could not get projects'});
    }
}

async delete(request: Request, response: Response) {
    const {id} = request.params;
    const user_id = response.locals.userId;
  try {
      await connection('projects').del().where({user_id, id});
      return response.json({success: "Deleted!"});
  } catch (error) {
  return response.status(500).json({ error: 'Could not delete project' });
      
  }
}
}
