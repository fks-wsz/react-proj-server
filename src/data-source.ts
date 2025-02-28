import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Wsz20040220.',
  database: 'nestjs-test',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  poolSize: 10,
  connectorPackage: 'mysql2',
};

const AppDataSource = new DataSource(AppDataSourceOptions);

export default AppDataSource;
