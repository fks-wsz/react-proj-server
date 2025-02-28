import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
import { OSSService } from './oss.service';

import { Result } from 'src/common/dto/result.type';
import { OSSType } from './dto/oss.type';
import { OSSResult } from './dto/oss.res.type';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OSSResolver {
  constructor(private readonly ossService: OSSService) {}

  @Query(() => OSSResult)
  async ossSignature(): Promise<Result<OSSType>> {
    return this.ossService.getOSSSignature();
  }
}
