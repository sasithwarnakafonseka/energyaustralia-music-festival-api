import * as dotenv from 'dotenv';

const envFiles = {
  development: 'development.env',
  staging: 'staging.env',
  production: 'production.env',
};

dotenv.config({ path: envFiles[process.env.NODE_ENV] || 'development.env' });
