import { UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from 'src/modules/user/user.service';
import { CardService } from './card.service';

import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { OrgId } from '@/common/decorators/org-id.decorator';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { OrgCheckGuard } from '@/common/guards/org.guard';

import { createResult, createResults } from 'src/shared/utils/response';

import { DevOnly } from 'src/common/decorators/is-dev-only.decorator';
import { BaseResultClsType, Result, Results } from 'src/common/dto/result.type';
import { CardInput } from './dto/card.input';
import { CardResult, CardResultsWithoutPage } from './dto/card.res.type';
import { Card } from './entities/card.entity';
import { CardSeed, SeedCardParamsInput } from './card.seed';
import { CommonError } from 'src/common/exceptions/errors';
import { COMMON_RESPONSE_CODE } from 'src/common/constants/response';

@Resolver()
@UseGuards(GqlAuthGuard, OrgCheckGuard)
export class CardResolver {
  constructor(
    private readonly cardService: CardService,
    private readonly userService: UserService,
    private readonly cardSeed: CardSeed,
  ) {}

  @Mutation(() => BaseResultClsType)
  async commitCard(
    @Args('params', new ValidationPipe()) params: CardInput,
    @CurUserId() userId: string,
    @OrgId() orgId: string,
  ) {
    const isSuccess = await this.cardService.commitCard(
      {
        ...params,
        course: {
          id: params.courseId,
        },
        org: {
          id: orgId,
        },
      },
      userId,
    );
    if (isSuccess) {
      return createResult('SUCCESS', '提交成功');
    }
  }

  @Query(() => CardResultsWithoutPage, { description: '获取消费卡列表(不分页)' })
  async getCards(
    @Args('courseId') courseId: string,
    @OrgId() orgId: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<Results<Card>> {
    const data = await this.cardService.getCards(courseId, orgId, name);
    return createResults('SUCCESS', '查询成功', data);
  }

  @Query(() => CardResult, { description: '获取消费卡详情' })
  async getCard(@Args('id') id: string): Promise<Result<Card>> {
    const card = await this.cardService.getCard(id);
    if (card) {
      return createResult('SUCCESS', '查询成功', card);
    } else {
      return createResult('SUCCESS', '消费卡不存在', null);
    }
  }

  @Mutation(() => BaseResultClsType, { description: '删除消费卡' })
  async deleteCard(@Args('id') id: string, @CurUserId() operatorId: string) {
    const operator = await this.userService.find(operatorId);
    if (!operator) {
      throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '操作用户不存在');
    }
    const delSuccess = await this.cardService.deleteCard(id, operatorId);
    if (delSuccess) {
      return createResult('SUCCESS', '删除消费卡成功');
    }
  }

  @DevOnly()
  @Query(() => BaseResultClsType)
  async seedCards(@Args('params') params: SeedCardParamsInput, @OrgId() orgId: string) {
    const isSuccess = await this.cardSeed.seedCards({ ...params, orgId });
    if (isSuccess) {
      return createResult('SUCCESS', '种子数据生成成功');
    }
  }
}
