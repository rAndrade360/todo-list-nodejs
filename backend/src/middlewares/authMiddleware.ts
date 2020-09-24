import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import secret from '../config/auth/secret';

export default class AuthMiddleware {
  async execute(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    const [, token] = String(authorization)?.split(' ');
    try {
      const decoded = Object(jwt.verify(token, secret.secret));
      response.locals.userId = decoded.id;

      return next();
    } catch (error) {
      return response.status(401).json({ error: 'Not authorized' });
    }
  }
}
