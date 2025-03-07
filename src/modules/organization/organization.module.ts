import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { UserService } from '../user/user.service';
import { OrgImageService } from '../orgImage/orgImage.service';
import { OrganizationSeed } from './organization.seed';

import { User } from '../user/entities/user.entity';
import { Organization } from './entities/organization.entity';
import { OrgImage } from '../orgImage/entities/org-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, OrgImage])],
  providers: [
    OrganizationResolver,
    OrganizationService,
    UserService,
    OrgImageService,
    OrganizationSeed,
  ],
})
export class OrganizationModule {}
