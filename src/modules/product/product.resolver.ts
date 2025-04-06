import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ProductService } from './product.service';

import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';

import { createResult, createResults } from 'src/shared/utils/response';

import { DevOnly } from 'src/common/decorators/is-dev-only.decorator';
import { PageInput } from 'src/common/dto/page.input';
import { BaseResultClsType, Result, Results } from 'src/common/dto/result.type';
import { ProductInput } from './dto/product.input';
import { ProductResult, ProductResults } from './dto/product.res.type';
import { Product } from './entities/product.entity';
import { ProductSeed } from './product.seed';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly productSeed: ProductSeed,
  ) {}

  @Mutation(() => BaseResultClsType)
  async commitProduct(@Args('params') params: ProductInput, @CurUserId() userId: string) {
    const isSuccess = await this.productService.commitProduct(params, userId);
    if (isSuccess) {
      return createResult('SUCCESS', '提交成功');
    }
  }

  @Query(() => ProductResults)
  async getProducts(
    @Args('page') pageIpt: PageInput,
    @Args('productName', { nullable: true }) productName?: string,
  ): Promise<Results<Product>> {
    const { pageNum, pageSize } = pageIpt;
    const { data, page } = await this.productService.getProducts(pageNum, pageSize, productName);
    return createResults('SUCCESS', '查询成功', data, page);
  }

  @Query(() => ProductResult)
  async getProduct(@Args('id') id: string): Promise<Result<Product>> {
    const product = await this.productService.getProduct(id);
    if (product) {
      return createResult('SUCCESS', '查询成功', product);
    } else {
      return createResult('SUCCESS', 'xxx不存在', null);
    }
  }

  @Mutation(() => BaseResultClsType)
  async deleteProduct(@Args('id') id: string, @CurUserId() operatorId: string) {
    const delSuccess = await this.productService.deleteProduct(id, operatorId);
    if (delSuccess) {
      return createResult('SUCCESS', '删除xxx成功');
    }
  }

  @DevOnly()
  @Query(() => BaseResultClsType)
  async seedProducts(@Args('count') count: number) {
    const isSuccess = await this.productSeed.seedProducts(count);
    if (isSuccess) {
      return createResult('SUCCESS', '种子数据生成成功');
    }
  }
}
