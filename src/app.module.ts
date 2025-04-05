import * as path from 'path';

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';

// providers
import { AppService } from './app.service';

// 配置模块
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from 'src/config/app.config.service';

// 过滤器
import { ResponseErrorFilter } from 'src/common/filters/response-error.filter';

// 数据库模块
import { AppDataSourceOptions } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

// GraphQL 模块
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// 模块
import { UserModule } from 'src/modules/user/user.module';
import { OSSModule } from 'src/modules/oss/oss.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StudentModule } from 'src/modules/student/student.module';
import { OrganizationModule } from 'src/modules/organization/organization.module';
import { CourseModule } from 'src/modules/course/course.module';
import { CardModule } from './modules/card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.join(process.cwd(), '.secret.env'),
        path.join(__dirname, `.env.${process.env.NODE_ENV}`),
      ],
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          headers: {
            Authorization: 'Bearer xxx',
          },
        }),
      ],
      autoSchemaFile: './graphql.schema.gql',
      formatError: (error) => {
        // 格式化错误输出
        return {
          message: error.message,
          path: error.path,
          errors: error?.extensions?.originalError || '',
        };
      },
    }),
    TypeOrmModule.forRoot(AppDataSourceOptions),
    UserModule,
    OSSModule,
    AuthModule,
    StudentModule,
    OrganizationModule,
    CourseModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    {
      provide: APP_FILTER,
      useClass: ResponseErrorFilter,
    },
  ],
  exports: [AppConfigService],
})
export class AppModule {}
