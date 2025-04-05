import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { OrgImageService } from '../orgImage/orgImage.service';
import { OrganizationSeed } from './organization.seed';

import { Organization } from './entities/organization.entity';
import { OrgImage } from '../orgImage/entities/org-image.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrgImage]), UserModule],
  providers: [OrganizationResolver, OrganizationService, OrgImageService, OrganizationSeed],
  exports: [OrganizationService],
})
export class OrganizationModule {}
