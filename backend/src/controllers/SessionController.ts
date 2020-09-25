import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connection from '../database/connection';
import secret from '../config/auth/secret';

export default class SessionController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const userAlreadyExists = await connection('users')
      .select('id', 'password', 'name')
      .where({ email })
      .first();

    if (!userAlreadyExists)
      return response.status(400).json({ error: 'User not exists!' });

    const passwordsMatch = await bcrypt.compare(
      password,
      userAlreadyExists.password,
    );
    if (passwordsMatch) {
      const token = jwt.sign({ id: userAlreadyExists.id }, String(secret.secret));
      return response.json({
        token,
        type: 'Bearer',
        user: {id: userAlreadyExists.id, name: userAlreadyExists.name, email},
      });
    }
    return response.status(401).json({ error: 'Incorrect password' });
  }
}
