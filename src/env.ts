import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const getEnv = <T>(key: string): T => {
  if (!process.env[key]) {
    throw new Error(`Variable wasn't found in env: ${key}`);
  }
  return process.env[key] as T;
};
