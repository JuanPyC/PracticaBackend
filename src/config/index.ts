import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  jwtSecret: string;
  databaseUrl: string | undefined;
  nodeEnv: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || 'your_super_secret_key_change_me',
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || 'development'
};

export default config;
