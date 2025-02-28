import { Module } from '@nestjs/common';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OSSResolver, OSSService],
})
export class OSSModule {}
