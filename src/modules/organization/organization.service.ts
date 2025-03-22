import { Injectable } from '@nestjs/common';

import { CommonError } from 'src/common/exceptions/errors';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

import { UserService } from '../user/user.service';
import { OrgImageService } from '../orgImage/orgImage.service';

import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Page } from 'src/common/dto/page.type';
import { ORG_ERROR_CODE } from './utils/response';
import { COMMON_RESPONSE_CODE } from 'src/common/constants/response';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly userService: UserService,
    private readonly orgImageService: OrgImageService,
  ) {}

  async commitOrganization(
    params: DeepPartial<Organization>,
    operatorId: string,
  ): Promise<boolean> {
    const { id } = params;
    if (id) {
      // 更新
      const targetOrganization = await this.organizationRepository.findOne({ where: { id } });
      if (!targetOrganization) {
        throw new CommonError(ORG_ERROR_CODE['ORG_NOT_FOUND'], '未找到机构信息');
      }
      try {
        params.updatedBy = operatorId;
        // typeorm 机制, 当更新连表数据时会将之前的数据外键置为空然后再插入新数据，因此需要先删除之前的数据
        await this.orgImageService.deleteByOrg(id);
        await this.organizationRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    } else {
      // 创建
      try {
        params.createdBy = operatorId;
        await this.organizationRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    }
  }

  /** 获取机构列表 */
  async getOrganizations(
    pageNum: number,
    pageSize: number,
  ): Promise<{ data: Organization[]; page: Page }> {
    try {
      const [organizations, total] = await this.organizationRepository.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'],
      });
      return {
        data: organizations,
        page: {
          pageNum,
          pageSize,
          total,
        },
      };
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }

  /** 获取机构信息 */
  async getOrganization(id: string): Promise<Organization> {
    const targetOrganization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'],
    });

    if (targetOrganization) {
      return targetOrganization;
    }
  }

  /** 删除机构 */
  async deleteOrganization(orgId: string, operatorId: string): Promise<boolean> {
    const operator = await this.userService.find(operatorId);
    if (!operator) {
      throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '操作用户不存在');
    }

    const targetOrganization = await this.getOrganization(orgId);
    if (!targetOrganization) {
      throw new CommonError(ORG_ERROR_CODE['ORG_NOT_FOUND'], '未找到机构信息');
    }

    try {
      targetOrganization.deletedBy = operatorId;
      await this.organizationRepository.softDelete(targetOrganization.id);
      return true;
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }
}
