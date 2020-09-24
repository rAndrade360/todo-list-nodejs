import express from 'express';

export default class App {
  app: express.Application;

  constructor() {
    this.app = express();
  }

  init() {
    this.app.listen(3333);
  }
}
