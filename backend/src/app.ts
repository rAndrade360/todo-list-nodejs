import express from 'express';
import routes from './routes';

export default class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(routes);
  }

  init() {
    this.app.listen(3333);
  }
}
