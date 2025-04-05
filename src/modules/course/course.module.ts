import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { CourseSeed } from './course.seed';

import { Course } from './entities/course.entity';
import { OrganizationModule } from '../organization/organization.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), OrganizationModule, UserModule],
  providers: [CourseResolver, CourseService, CourseSeed],
})
export class CourseModule {}
