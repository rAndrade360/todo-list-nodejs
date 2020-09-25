import 'dotenv/config'
import express from 'express';
import routes from './routes';
import cors from 'cors';
import helmet from 'helmet';

export default class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(routes);
  }

  init() {
    this.app.listen(3333);
  }
}
