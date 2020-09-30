import { Request, Response } from 'express';
import connection from '../database/connection';
import generateHashedPassword from '../utils/generateHashedPassword';
import UserValidator from '../validators/userValidator';

const userValidator = new UserValidator();

export default class UserController {
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;

    if(!await userValidator.store(request.body))
      return response.status(400).json({error: "Icorrect values"})

    try {
      const userAlreadyExists = await connection('users')
        .select('id')
        .where({ email })
        .first();
      if (userAlreadyExists)
        return response.status(400).json({ error: 'Email already exists' });

      const hashedPassword = await generateHashedPassword(password);

      const user = await connection('users').insert({
        name,
        email,
        password: hashedPassword,
      });
      return response.json({ user });
    } catch (error) {
      return response.status(500).json({ error: 'Could not register user' });
    }
  }
}
