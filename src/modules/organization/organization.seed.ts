import faker from 'src/shared/utils/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Organization } from './entities/organization.entity';
import { OrgImage } from '../orgImage/entities/org-image.entity';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

@Injectable()
export class OrganizationSeed {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async seedOrganizations(count: number): Promise<boolean> {
    try {
      const data = new Array(count).fill(null).map(() => {
        const org = new Organization();
        org.businessLicenseUrl = faker.image.url();
        org.idCardFrontUrl = faker.image.url();
        org.idCardBackUrl = faker.image.url();
        org.tags = faker.helpers
          .arrayElements(['语言培训', '音乐培训', '美术培训', '体育培训'], { min: 1, max: 3 })
          .join(',');
        org.description = faker.lorem.paragraph();
        org.organizationName = faker.company.name();
        org.logoUrl = faker.image.url();
        org.address = faker.location.streetAddress({ useFullAddress: true });
        org.longitude = faker.location.longitude().toString();
        org.latitude = faker.location.latitude().toString();
        org.phoneNumber = faker.phone.number();
        org.orgFrontImg = [{ url: faker.image.url() }, { url: faker.image.url() }] as OrgImage[];

        return org;
      });

      await this.organizationRepository.save(data);

      return true;
    } catch (err: unknown) {
      console.log(err);
      throw new InternalServerException();
    }
  }
}
