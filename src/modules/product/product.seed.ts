import faker from 'src/shared/utils/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';
import { Organization } from '../organization/entities/organization.entity';

@Injectable()
export class ProductSeed {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async seedProducts(orgId: string, count: number = 1): Promise<boolean> {
    try {
      const data = new Array(count).fill(null).map(() => {
        const product = new Product();
        product.org = { id: orgId } as Organization;
        product.name = faker.commerce.productName();
        product.desc = faker.lorem.paragraph();
        product.stock = faker.number.int({ min: 10, max: 1000 });
        product.curStock = 100;
        product.buyNum = 10;
        product.limitBuyNumPerson = faker.helpers.arrayElement([-1, 1, 2, 5, 10]); // -1 means no limit
        product.coverUrl = `${faker.image.url()}.jpg`;
        product.bannerUrl = `${faker.image.url()}.jpg`;
        product.originalPrice = parseFloat(faker.commerce.price({ min: 10, max: 1000 }));
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
