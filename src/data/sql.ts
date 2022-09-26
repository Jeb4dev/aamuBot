import { Sequelize } from 'sequelize';
import { getEnv } from '../env';

export const sequelize = new Sequelize(getEnv('SQL_STRING'));
