import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'storage.db',
  synchronize: false,
  logging: true,
  entities: [__dirname + '/entities/*{.js,.ts}'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
});
