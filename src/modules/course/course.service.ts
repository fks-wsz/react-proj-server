import { Injectable } from '@nestjs/common';

import { CommonError } from 'src/common/exceptions/errors';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/dto/page.type';
import { DeepPartial, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { COURSE_ERROR_CODE } from './utils/response';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async commitCourse(params: DeepPartial<Course>, operatorId: string): Promise<boolean> {
    const { id } = params;
    if (id) {
      // 更新
      const targetCourse = await this.courseRepository.findOne({ where: { id } });
      if (!targetCourse) {
        throw new CommonError(COURSE_ERROR_CODE['COURSE_NOT_FOUND'], '未找到课程信息');
      }
      try {
        params.updatedBy = operatorId;
        await this.courseRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    } else {
      // 创建
      try {
        params.createdBy = operatorId;
        await this.courseRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    }
  }

  /** 获取xx列表 */
  async getCourses(
    pageNum: number,
    pageSize: number,
    orgId: string,
    name?: string,
  ): Promise<{ data: Course[]; page: Page }> {
    try {
      const where: FindOptionsWhere<Course> = {};
      where.org = {
        id: orgId,
      };
      // todo: 可选名称模糊查询
      if (name) {
        where.name = Like(`%${name}%`);
      }
      const [courses, total] = await this.courseRepository.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where,
      });
      return {
        data: courses,
        page: {
          pageNum,
          pageSize,
          total,
        },
      };
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }

  /** 获取课程信息 */
  async getCourse(id: string, orgId: string): Promise<Course> {
    const targetCourse = await this.courseRepository.findOne({
      where: { id, org: { id: orgId } },
    });

    if (targetCourse) {
      return targetCourse;
    }
  }

  /** 删除课程 */
  async deleteCourse(id: string, operatorId: string, orgId: string): Promise<boolean> {
    const targetCourse = await this.getCourse(id, orgId);
    if (!targetCourse) {
      throw new CommonError(COURSE_ERROR_CODE['COURSE_NOT_FOUND'], '未找到课程信息');
    }

    try {
      targetCourse.deletedBy = operatorId;
      await this.courseRepository.softDelete(targetCourse.id);
      return true;
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }
}
