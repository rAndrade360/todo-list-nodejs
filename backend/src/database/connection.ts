import knex from 'knex';
import path from 'path';

const config: knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'dev.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
  useNullAsDefault: true,
};

const connection = knex(config);

export default connection;
