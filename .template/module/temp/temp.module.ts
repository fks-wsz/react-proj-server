import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TempService } from './temp.service';
import { TempResolver } from './temp.resolver';
import { UserService } from 'src/modules/user/user.service';
import { TempSeed } from './temp.seed';

import { User } from 'src/modules/user/entities/user.entity';
import { Temp } from './entities/temp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Temp])],
  providers: [TempResolver, TempService, UserService, TempSeed],
})
export class TempModule {}
