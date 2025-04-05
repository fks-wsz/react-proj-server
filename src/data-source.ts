import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
// import CommonEntity from './common/entities/common.entity';
// import { User } from './modules/user/entities/user.entity';
// import { Organization } from './modules/organization/entities/organization.entity';
// import { Course } from './modules/course/entities/course.entity';
// import { Student } from './modules/student/entities/student.entity';
// import { OrgImage } from './modules/orgImage/entities/org-image.entity';

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Wsz20040220.',
  database: 'nestjs-test',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [path.join(__dirname, './modules/**/entities/', './*.entity.{ts,js}')],
  migrations: [path.join(__dirname, './migration/*.{ts,js}')],
  poolSize: 10,
  connectorPackage: 'mysql2',
};

const AppDataSource = new DataSource(AppDataSourceOptions);

export default AppDataSource;
