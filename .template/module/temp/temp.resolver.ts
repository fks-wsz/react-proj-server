import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from 'src/modules/user/user.service';
import { TempService } from './temp.service';

import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';

import { createResult, createResults } from 'src/shared/utils/response';

import { DevOnly } from 'src/common/decorators/is-dev-only.decorator';
import { PageInput } from 'src/common/dto/page.input';
import { BaseResultClsType, Result, Results } from 'src/common/dto/result.type';
import { TempInput } from './dto/temp.input';
import { TempResult, TempResults } from './dto/temp.res.type';
import { Temp } from './entities/temp.entity';
import { TempSeed } from './temp.seed';
import { CommonError } from 'src/common/exceptions/errors';
import { COMMON_RESPONSE_CODE } from 'src/common/constants/response';

@Resolver()
@UseGuards(GqlAuthGuard)
export class TempResolver {
  constructor(
    private readonly tempService: TempService,
    private readonly userService: UserService,
    private readonly tempSeed: TempSeed,
  ) {}

  @Mutation(() => BaseResultClsType)
  async commitTemp(@Args('params') params: TempInput, @CurUserId() userId: string) {
    const operationUser = await this.userService.find(userId);
    if (!operationUser) {
      return createResult('USER_NOT_FOUND', '操作用户不存在');
    }
    const isSuccess = await this.tempService.commitTemp(params, userId);
    if (isSuccess) {
      return createResult('SUCCESS', '提交成功');
    }
  }

  @Query(() => TempResults)
  async getTemps(
    @Args('page') pageIpt: PageInput,
    @Args('tempName', { nullable: true }) tempName?: string,
  ): Promise<Results<Temp>> {
    const { pageNum, pageSize } = pageIpt;
    const { data, page } = await this.tempService.getTemps(pageNum, pageSize, tempName);
    return createResults('SUCCESS', '查询成功', data, page);
  }

  @Query(() => TempResult)
  async getTemp(@Args('id') id: string): Promise<Result<Temp>> {
    const temp = await this.tempService.getTemp(id);
    if (temp) {
      return createResult('SUCCESS', '查询成功', temp);
    } else {
      return createResult('SUCCESS', 'xx不存在', null);
    }
  }

  @Mutation(() => BaseResultClsType)
  async deleteTemp(@Args('id') id: string, @CurUserId() operatorId: string) {
    const operator = await this.userService.find(operatorId);
    if (!operator) {
      throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '操作用户不存在');
    }
    const delSuccess = await this.tempService.deleteTemp(id, operatorId);
    if (delSuccess) {
      return createResult('SUCCESS', '删除xxx成功');
    }
  }

  @DevOnly()
  @Query(() => BaseResultClsType)
  async seedTemps(@Args('count') count: number) {
    const isSuccess = await this.tempSeed.seedTemps(count);
    if (isSuccess) {
      return createResult('SUCCESS', '种子数据生成成功');
    }
  }
}
