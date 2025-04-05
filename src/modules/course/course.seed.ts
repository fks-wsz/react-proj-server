import faker from 'src/shared/utils/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

@Injectable()
export class CourseSeed {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async seedCourses(count: number): Promise<boolean> {
    try {
      const data = new Array(count).fill(null).map(() => {
        const course = new Course();
        course.name = faker.lorem.words(3);
        course.description = faker.lorem.paragraph();
        course.fitPeople = faker.lorem.sentence();
        course.baseAbility = faker.lorem.sentence();
        course.sections = faker.number.int({ min: 1, max: 20 });
        course.sectionDuration = faker.number.int({ min: 30, max: 120 });
        course.stuCount = faker.number.int({ min: 0, max: 1000 });
        course.reserveInfo = faker.lorem.paragraph();
        course.refundInfo = faker.lorem.paragraph();
        course.otherInfo = faker.lorem.paragraph();
        return course;
      });

      await this.courseRepository.save(data);

      return true;
    } catch (err: unknown) {
      console.log(err);
      throw new InternalServerException();
    }
  }
}
