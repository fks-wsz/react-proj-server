import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { createResult } from 'src/shared/utils/response';

import { UserService } from './user.service';

import { GqlAuthGuard } from 'src/common/guards/auth.guard';

import { CurUserId } from 'src/common/decorators/current-user.decorator';

import { UserInput } from './dto/user-input.dto';
import { UserType } from './dto/user.type';
import { UserResult } from './dto/user.res.type';
import { BaseResultClsType, Result } from 'src/common/dto/result.type';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResult)
  async find(@Args('id') id: string): Promise<Result<UserType> | null> {
    const targetUser = await this.userService.find(id);
    if (targetUser) {
      return createResult('SUCCESS', '查询用户成功', targetUser);
    }
  }

  @Query(() => UserResult)
  async getUserInfo(@CurUserId() userId: string): Promise<Result<UserType> | null> {
    const targetUser = await this.userService.find(userId);
    if (targetUser) {
      return createResult('SUCCESS', '查询用户成功', targetUser);
    }
  }

  @Mutation(() => BaseResultClsType)
  async create(@Args('params') params: UserInput): Promise<Result> {
    const isSuccess = await this.userService.create(params);
    if (isSuccess) {
      return createResult('SUCCESS', '创建用户成功');
    }
  }

  @Mutation(() => BaseResultClsType)
  async updateUserInfo(@Args('id') id: string, @Args('params') params: UserInput): Promise<Result> {
    const isUpdateSuccess = await this.userService.update(id, params);
    if (isUpdateSuccess) {
      return createResult('SUCCESS', '更新用户信息成功');
    }
  }

  @Mutation(() => BaseResultClsType)
  async del(@Args('id') id: string): Promise<Result> {
    const isDelSuccess = await this.userService.del(id);
    if (isDelSuccess) {
      return createResult('SUCCESS', '删除用户成功');
    }
  }
}
