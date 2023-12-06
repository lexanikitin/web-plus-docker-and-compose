import * as process from 'process';

export default () => ({
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    name: process.env.DB_NAME || 'kupipodariday',
    user: process.env.DB_USER || 'student',
    password: process.env.DB_PASSWORD || 'student',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
