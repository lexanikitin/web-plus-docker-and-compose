import * as process from 'process';

export default () => ({
  db: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    name: process.env.POSTGRES_DB || 'kupipodari',
    user: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
