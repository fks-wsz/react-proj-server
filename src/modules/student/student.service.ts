import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { STUDENT_RESPONSE_CODE } from './constants/response';

import { Student } from './entities/student.entity';
import { PageInput } from 'src/common/dto/page.input';
import { CommonError } from 'src/common/exceptions/errors';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';
import { Page } from 'src/common/dto/page.type';

@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {}

  /** 学生ID查找学生  */
  async findStudentById(id: string): Promise<Student> {
    try {
      const targetStudent = await this.studentRepository.findOne({
        where: {
          id,
        },
      });

      return targetStudent;
    } catch (err: unknown) {
      throw new InternalServerException();
    }
  }

  /** 批量查找学生 */
  async findStudents(page: PageInput): Promise<{ data: Student[]; page: Page }> {
    try {
      const { pageNum, pageSize } = page;
      const [students, total] = await this.studentRepository.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        order: {
          createdAt: 'DESC',
        },
      });
      return {
        data: students,
        page: {
          pageNum,
          pageSize,
          total,
        },
      };
    } catch (err: unknown) {
      throw new InternalServerException();
    }
  }

  async updateStudent(id: string, params: DeepPartial<Student>): Promise<boolean> {
    const targetStudent = await this.studentRepository.findOne({
      where: { id },
    });
    if (targetStudent === null) {
      throw new CommonError(STUDENT_RESPONSE_CODE['STUDENT_NOT_FOUND'], '未找到学生信息');
    }
    try {
      const mergedStudent = this.studentRepository.merge(targetStudent, params);
      await this.studentRepository.save(mergedStudent);
      return true;
    } catch (err: unknown) {
      throw new InternalServerException();
    }
  }
}
