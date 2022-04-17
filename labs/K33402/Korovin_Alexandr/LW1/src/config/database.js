require('dotenv').config();

// const {
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_DB,
//   DB_HOST,
//   DB_CONNECTION,
// } = process.env;

const username =  'postgres';
const password =  '1234';
const database =  'ts';
const host =  'localhost';
const dialect =  'postgres';

module.exports = {
  development: { username, password, database, host, dialect },
  test: { username, password, database, host, dialect },
  production: { username, password, database, host, dialect },
};
