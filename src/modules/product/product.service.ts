import { Injectable } from '@nestjs/common';

import { CommonError } from 'src/common/exceptions/errors';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/dto/page.type';
import { DeepPartial, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PRODUCT_ERROR_CODE } from './utils/response';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async commitProduct(params: DeepPartial<Product>, operatorId: string): Promise<boolean> {
    const { id } = params;
    if (id) {
      // 更新
      const targetProduct = await this.productRepository.findOne({ where: { id } });
      if (!targetProduct) {
        throw new CommonError(PRODUCT_ERROR_CODE['商品'], '未找到商品信息');
      }
      try {
        params.updatedBy = operatorId;
        await this.productRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    } else {
      // 创建
      try {
        params.createdBy = operatorId;
        await this.productRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    }
  }

  /** 获取商品列表 */
  async getProducts(
    pageNum: number,
    pageSize: number,
    name?: string,
  ): Promise<{ data: Product[]; page: Page }> {
    try {
      const where: FindOptionsWhere<Product> = {};
      // todo: 可选名称模糊查询
      if (name) {
        where.name = Like(`%${name}%`);
      }
      const [products, total] = await this.productRepository.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where,
        // relations: ['商品'],
      });
      return {
        data: products,
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

  /** 获取商品信息 */
  async getProduct(id: string): Promise<Product> {
    const targetProduct = await this.productRepository.findOne({
      where: { id },
      // relations: ['商品'],
    });

    if (targetProduct) {
      return targetProduct;
    }
  }

  /** 删除商品 */
  async deleteProduct(id: string, operatorId: string): Promise<boolean> {
    const targetProduct = await this.getProduct(id);
    if (!targetProduct) {
      throw new CommonError(PRODUCT_ERROR_CODE['商品'], '未找到商品信息');
    }

    try {
      targetProduct.deletedBy = operatorId;
      await this.productRepository.softDelete(targetProduct.id);
      return true;
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }
}
