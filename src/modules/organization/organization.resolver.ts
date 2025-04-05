import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from '../user/user.service';
import { OrganizationService } from './organization.service';

import { CurUserId } from 'src/common/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';

import { createResult, createResults } from 'src/shared/utils/response';

import { DevOnly } from 'src/common/decorators/is-dev-only.decorator';
import { PageInput } from 'src/common/dto/page.input';
import { BaseResultClsType, Result, Results } from 'src/common/dto/result.type';
import { OrganizationInput } from './dto/organization.input';
import { OrganizationResult, OrganizationResults } from './dto/organization.res.type';
import { Organization } from './entities/organization.entity';
import { OrganizationSeed } from './organization.seed';

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
  async getOrganizations(
    @Args('page') pageIpt: PageInput,
    @Args('organizationName', { nullable: true }) organizationName?: string,
  ): Promise<Results<Organization>> {
    const { pageNum, pageSize } = pageIpt;
    const { data, page } = await this.organizationService.getOrganizations(
      pageNum,
      pageSize,
      organizationName,
    );
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
  async deleteOrganization(@Args('id') orgId: string, @CurUserId() operatorId: string) {
    const delSuccess = await this.organizationService.deleteOrganization(orgId, operatorId);
    if (delSuccess) {
      return createResult('SUCCESS', '删除机构成功');
    }
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
