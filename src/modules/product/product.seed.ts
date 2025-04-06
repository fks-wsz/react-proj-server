import faker from 'src/shared/utils/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

@Injectable()
export class ProductSeed {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seedProducts(count: number): Promise<boolean> {
    try {
      const data = new Array(count).fill(null).map(() => {
        const product = new Product();
        // faker product properties
        console.warn('Faker is not used!');
        console.log(faker.food.fruit());
        return product;
      });

      await this.productRepository.save(data);

      return true;
    } catch (err: unknown) {
      console.log(err);
      throw new InternalServerException();
    }
  }
}
