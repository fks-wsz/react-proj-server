import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { OrganizationModule } from '../organization/organization.module';

import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { CardSeed } from './card.seed';

import { Card } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), UserModule, OrganizationModule],
  providers: [CardResolver, CardService, CardSeed],
  exports: [CardService],
})
export class CardModule {}
