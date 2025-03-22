import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { OrganizationService } from './organization.service';
import { UserService } from '../user/user.service';

import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { CurUserId } from 'src/common/decorators/current-user.decorator';

import { createResult, createResults } from 'src/shared/utils/response';

import { Organization } from './entities/organization.entity';
import { OrganizationResult, OrganizationResults } from './dto/organization.res.type';
import { BaseResultClsType, Result, Results } from 'src/common/dto/result.type';
import { OrganizationInput } from './dto/organization.input';
import { PageInput } from 'src/common/dto/page.input';
import { OrganizationSeed } from './organization.seed';
import { DevOnly } from 'src/common/decorators/is-dev-only.decorator';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService,
    private readonly organizationSeed: OrganizationSeed,
  ) {}

  @Mutation(() => BaseResultClsType)
  async commitOrganization(@Args('params') params: OrganizationInput, @CurUserId() userId: string) {
    const operationUser = await this.userService.find(userId);
    if (!operationUser) {
      return createResult('USER_NOT_FOUND', '操作用户不存在');
    }
    const isSuccess = await this.organizationService.commitOrganization(params, userId);
    if (isSuccess) {
      return createResult('SUCCESS', '提交成功');
    }
  }

  @Query(() => OrganizationResults)
  async getOrganizations(@Args('page') pageIpt: PageInput): Promise<Results<Organization>> {
    const { pageNum, pageSize } = pageIpt;
    const { data, page } = await this.organizationService.getOrganizations(pageNum, pageSize);
    return createResults('SUCCESS', '查询成功', data, page);
  }

  @Query(() => OrganizationResult)
  async getOrganization(@Args('id') id: string): Promise<Result<Organization>> {
    const organization = await this.organizationService.getOrganization(id);
    if (organization) {
      return createResult('SUCCESS', '查询成功', organization);
    } else {
      return createResult('SUCCESS', '门店不存在', null);
    }
  }

  @Mutation(() => BaseResultClsType)
  deleteOrganization(@Args('id') orgId: string, @CurUserId() operatorId: string) {
    return this.organizationService.deleteOrganization(orgId, operatorId);
  }

  @DevOnly()
  @Query(() => BaseResultClsType)
  async seedOrganizations(@Args('count') count: number) {
    const isSuccess = await this.organizationSeed.seedOrganizations(count);
    if (isSuccess) {
      return createResult('SUCCESS', '种子数据生成成功');
    }
  }
}
