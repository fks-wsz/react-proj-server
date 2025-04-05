import faker from 'src/shared/utils/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Temp } from './entities/temp.entity';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

@Injectable()
export class TempSeed {
  constructor(
    @InjectRepository(Temp)
    private readonly tempRepository: Repository<Temp>,
  ) {}

  async seedTemps(count: number): Promise<boolean> {
    try {
      const data = new Array(count).fill(null).map(() => {
        const temp = new Temp();
        // faker temp properties
        console.warn('Faker is not used!');
        console.log(faker.food.fruit());
        return temp;
      });

      await this.tempRepository.save(data);

      return true;
    } catch (err: unknown) {
      console.log(err);
      throw new InternalServerException();
    }
  }
}
