import {Request, Response} from 'express';
import connection from '../database/connection';
import * as Yup from 'yup';
import ImportantValidator from '../validators/importantValidator';

const importantValidator = new ImportantValidator();

export default class CompletTaskController {
    async store(request: Request, response: Response) {
        const {id} = request.params;
        const userId = response.locals.userId;
        const {is_important} = request.body;

        if(!await importantValidator.store(request.body))
          return response.status(400).json({error: "Icorrect values"})
      
        try {
          await connection('tasks').update({is_important}).where({id, user_id: userId});
          return response.json({success: "Completed successfully"});
        }catch(error){
          return response.status(500).json({error: 'Could not update'});
        }
    
    }

    async getAll(request: Request, response: Response) {
        const userId = response.locals.userId;
        
        try {
          const importants = await connection('tasks').select('*').where({is_important: true, user_id: userId});
          return response.json(importants);
        }catch(error){
          return response.status(500).json({error: 'Could not get importants'});
        }
    
    }
}