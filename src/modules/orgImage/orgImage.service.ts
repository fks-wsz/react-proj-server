import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrgImage } from './entities/org-image.entity';
import { Repository } from 'typeorm';
import { CommonError } from 'src/common/exceptions/errors';
import { ORG_IMAGE_RES_CODE } from './utils/response';

@Injectable()
export class OrgImageService {
  constructor(
    @InjectRepository(OrgImage)
    private readonly orgImageRepository: Repository<OrgImage>,
  ) {}

  async deleteByOrg(orgId: string): Promise<boolean> {
    const imgs = await this.orgImageRepository
      .createQueryBuilder('orgImage')
      .where(`orgImage.org_id_for_front = '${orgId}'`)
      .orWhere(`orgImage.org_id_for_room = '${orgId}'`)
      .orWhere(`orgImage.org_id_for_other = '${orgId}'`)
      .getMany();
    if (imgs.length === 0) {
      return true;
    }
    const delResult = await this.orgImageRepository.delete(imgs.map((item) => item.id));

    if (delResult.affected > 0) {
      return true;
    }
    throw new CommonError(ORG_IMAGE_RES_CODE['DEL_IMG_FAILED'], '删除图片失败');
  }
}
