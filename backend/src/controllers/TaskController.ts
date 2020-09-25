import { Request, Response } from 'express';
import connection from '../database/connection';

export default class TaskController {
  async store(request: Request, response: Response) {
    const { name, is_important, completed, schedule, project_id } = request.body;
    try {
      const userId = response.locals.userId;
      const task = await connection('tasks').insert({
        name,
        is_important,
        completed,
        project_id,
        schedule,
        user_id: userId
      });
      return response.json({ task });
    } catch (error) {
        console.log(error);
      return response.status(500).json({ error: 'Could not register task' });
    }
  }

  async index(request: Request, response: Response) {
      const userId = response.locals.userId;
      try {
          const tasks = await connection('tasks').select('*').where({user_id: userId});
          return response.json(tasks);
      } catch (error) {
      return response.status(500).json({ error: 'Could not get tasks' });
          
      }
  }

  async show(request: Request, response: Response) {
      const {id} = request.params;
      const user_id = response.locals.userId;
    try {
        const tasks = await connection('tasks').select('*').where({user_id, id});
        return response.json(tasks);
    } catch (error) {
    return response.status(500).json({ error: 'Could not get task' });
        
    }
  }

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const userId = response.locals.userId;
    const {name} = request.body;
    
    try {
      await connection('tasks').update({name}).where({id, user_id: userId});
      return response.json({success: "Updated successfully"});
    }catch(error){
      return response.status(500).json({error: 'Could not update'});
    }

  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;
    const user_id = response.locals.userId;
  try {
      await connection('tasks').del().where({user_id, id});
      return response.json({success: "Deleted!"});
  } catch (error) {
      console.log(error);
  return response.status(500).json({ error: 'Could not delete task' });
      
  }
}
}
