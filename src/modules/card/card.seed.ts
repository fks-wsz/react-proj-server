import faker from 'src/shared/utils/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Card } from './entities/card.entity';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';
import { CardType } from './types';
import { Field, InputType } from '@nestjs/graphql';
import { Course } from '../course/entities/course.entity';
import { Organization } from '../organization/entities/organization.entity';

export class SeedCardParams {
  count: number;
  courseId: string;
  orgId: string;
}
@InputType()
export class SeedCardParamsInput {
  @Field({
    description: '数量',
  })
  count: number;

  @Field({
    description: '课程ID',
  })
  courseId: string;
}

@Injectable()
export class CardSeed {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async seedCards(params: SeedCardParams): Promise<boolean> {
    try {
      const { count = 10, orgId, courseId } = params;
      const data = new Array(count).fill(null).map(() => {
        const card = new Card();
        card.name = faker.commerce.productName();
        card.type = CardType['DURATION'];
        card.days = faker.number.int({ min: 1, max: 365 });
        card.course = { id: courseId } as Course;
        card.org = { id: orgId } as Organization;
        return card;
      });

      await this.cardRepository.save(data);

      return true;
    } catch (err: unknown) {
      console.log(err);
      throw new InternalServerException();
    }
  }
}
