import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from 'src/modules/user/user.service';
import { CourseService } from './course.service';

import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { OrgId } from '@/common/decorators/org-id.decorator';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';

import { createResult, createResults } from 'src/shared/utils/response';

import { DevOnly } from 'src/common/decorators/is-dev-only.decorator';
import { PageInput } from 'src/common/dto/page.input';
import { BaseResultClsType, Result, Results } from 'src/common/dto/result.type';
import { PartialCourseInput } from './dto/course.input';
import { CourseResult, CourseResults } from './dto/course.res.type';
import { Course } from './entities/course.entity';
import { CourseSeed } from './course.seed';
import { CommonError } from 'src/common/exceptions/errors';
import { COMMON_RESPONSE_CODE } from 'src/common/constants/response';
import { OrgCheckGuard } from '@/common/guards/org.guard';

@Resolver()
@UseGuards(GqlAuthGuard, OrgCheckGuard)
export class CourseResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly userService: UserService,
    private readonly courseSeed: CourseSeed,
  ) {}

  @Mutation(() => BaseResultClsType, { description: '创建/更新课程' })
  async commitCourse(
    @Args('params') params: PartialCourseInput,
    @CurUserId() userId: string,
    @OrgId() orgId: string,
  ) {
    const operationUser = await this.userService.find(userId);
    if (!operationUser) {
      throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '操作用户不存在');
    }
    const isSuccess = await this.courseService.commitCourse(
      { ...params, org: { id: orgId } },
      userId,
    );
    if (isSuccess) {
      return createResult('SUCCESS', '提交成功');
    }
  }

  @Query(() => CourseResults, { description: '获取课程列表' })
  async getCourses(
    @Args('page') pageIpt: PageInput,
    @OrgId() orgId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<Results<Course>> {
    const { pageNum, pageSize } = pageIpt;
    const { data, page } = await this.courseService.getCourses(pageNum, pageSize, orgId, name);
    return createResults('SUCCESS', '查询成功', data, page);
  }

  @Query(() => CourseResult, { description: '查询某门课程' })
  async getCourse(@Args('id') id: string, @OrgId() orgId: string): Promise<Result<Course>> {
    const course = await this.courseService.getCourse(id, orgId);
    if (course) {
      return createResult('SUCCESS', '查询成功', course);
    } else {
      return createResult('SUCCESS', '课程不存在', null);
    }
  }

  @Mutation(() => BaseResultClsType, { description: '删除课程' })
  async deleteCourse(
    @Args('id') id: string,
    @CurUserId() operatorId: string,
    @OrgId() orgId: string,
  ) {
    const operator = await this.userService.find(operatorId);
    if (!operator) {
      throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '操作用户不存在');
    }
    const delSuccess = await this.courseService.deleteCourse(id, operatorId, orgId);
    if (delSuccess) {
      return createResult('SUCCESS', '删除课程成功');
    }
  }

  @DevOnly()
  @Query(() => BaseResultClsType)
  async seedCourses(@Args('count') count: number) {
    const isSuccess = await this.courseSeed.seedCourses(count);
    if (isSuccess) {
      return createResult('SUCCESS', '种子数据生成成功');
    }
  }
}
