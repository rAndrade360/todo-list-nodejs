import {Request, Response} from 'express';
import * as Yup from 'yup';
import connection from '../database/connection';
import CompleteTaskValidator from '../validators/completeTaskValidator';

const completeTaskValidator = new CompleteTaskValidator();

export default class CompletTaskController {
    async store(request: Request, response: Response) {
        const {id} = request.params;
        const userId = response.locals.userId;
        const {completed} = request.body;
    
        if(!await completeTaskValidator.store(request.body)) 
          return response.status(400).json({error: "Icorrect values"})
        
        try {
          await connection('tasks').update({completed}).where({id, user_id: userId});
          return response.json({success: "Completed successfully"});
        }catch(error){
          return response.status(500).json({error: 'Could not update'});
        }
    
    }

    async getAll(request: Request, response: Response) {
        const userId = response.locals.userId;
        const { project_id = null } = request.headers;
        
        try {
          const completeds = await connection('tasks').select('*').where({completed: true, user_id: userId, project_id});
          return response.json(completeds);
        }catch(error){
          return response.status(500).json({error: 'Could not get completeds'});
        }
    
    }
}
