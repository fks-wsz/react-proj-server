import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createResult, createResults } from 'src/shared/utils/response';

import { StudentService } from './student.service';
import { StudentSeed } from './student.seed';

import { GqlAuthGuard } from 'src/common/guards/auth.guard';

import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { DevOnly } from 'src/common/decorators/is-dev-only.decorator';

import { StudentResult, StudentResults } from './dto/student.res.type';
import { BaseResult, BaseResultClsType, Result, Results } from 'src/common/dto/result.type';
import { StudentType } from './dto/student.type';
import { PageInput } from 'src/common/dto/page.input';
import { Student } from './entities/student.entity';
import { StudentInput } from './dto/student.input';

@Resolver()
@UseGuards(GqlAuthGuard)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly studentSeed: StudentSeed,
  ) {}

  @Query(() => StudentResult)
  async findStudentById(@Args('id') id: string): Promise<Result<Student>> {
    const targetStudent = await this.studentService.findStudentById(id);
    return createResult('SUCCESS', '查询成功', targetStudent);
  }

  @Query(() => StudentResults)
  async findStudents(@Args('page') pageIpt: PageInput): Promise<Results<StudentType>> {
    const { data, page } = await this.studentService.findStudents(pageIpt);
    return createResults('SUCCESS', '查询成功', data, page);
  }

  @Mutation(() => BaseResultClsType)
  async updateStudent(
    @CurUserId() userId: string,
    @Args('params') params: StudentInput,
  ): Promise<BaseResult> {
    const isSuccess = await this.studentService.updateStudent(userId, params);
    if (isSuccess) {
      return createResult('SUCCESS', '更新成功');
    }
  }

  @Query(() => BaseResultClsType)
  @DevOnly()
  async seedStudents(): Promise<BaseResult> {
    const isSuccess = await this.studentSeed.seedStudents(10);
    if (isSuccess) {
      return createResult('SUCCESS', '种子数据生成成功');
    }
  }
}
