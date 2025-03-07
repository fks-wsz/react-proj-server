import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { OSSService } from './oss.service';
import { createResult } from 'src/shared/utils/response';

import { Result } from 'src/common/dto/result.type';
import { OSSType } from './dto/oss.type';
import { OSSResult } from './dto/oss.res.type';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @Query(() => OSSResult)
  async ossSignature(): Promise<Result<OSSType>> {
    const ossInfo = await this.ossService.getOSSSignature();
    return createResult('SUCCESS', '获取成功', ossInfo);
  }
}
