import faker from 'src/shared/utils/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './entities/student.entity';
import { SeedError } from 'src/common/exceptions/errors';

@Injectable()
export class StudentSeed {
  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {}

  async seedStudents(count: number): Promise<boolean> {
    try {
      const students = new Array(count).fill(null).map(() => {
        const student = new Student();
        student.nickname = faker.internet.username();
        student.realName = faker.person.fullName();
        student.phoneNumber = faker.phone.number({ style: 'international' });
        student.avatarUrl = faker.image.avatar();
        student.password = faker.internet.password();

        return student;
      });

      await this.studentRepository.save(students);

      return true;
    } catch (err: unknown) {
      console.error(err);
      throw new SeedError('种子数据生成失败');
    }
  }
}
