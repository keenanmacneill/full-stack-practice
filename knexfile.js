require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      password: 'docker',
      user: 'postgres',
      port: 5432,
      database: 'pet_store',
    },
  },

  staging: {
    client: '',
    connection: {},
  },

  production: {
    client: '',
    connection: {},
  },
};
