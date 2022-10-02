import { DataSource } from 'typeorm';
import { getEnv } from './env';

export const AppDataSource = new DataSource({
  url: getEnv('DB_ADDRESS'),
  type: 'postgres',
  synchronize: false,
  logging: true,
  entities: [__dirname + '/entities/*{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
});
