import { Injectable } from '@nestjs/common';

import { CommonError } from 'src/common/exceptions/errors';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

import { UserService } from 'src/modules/user/user.service';

import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/dto/page.type';
import { DeepPartial, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Temp } from './entities/temp.entity';
import { TEMP_ERROR_CODE } from './utils/response';

@Injectable()
export class TempService {
  constructor(
    @InjectRepository(Temp)
    private readonly tempRepository: Repository<Temp>,
    private readonly userService: UserService,
  ) {}

  async commitTemp(params: DeepPartial<Temp>, operatorId: string): Promise<boolean> {
    const { id } = params;
    if (id) {
      // 更新
      const targetTemp = await this.tempRepository.findOne({ where: { id } });
      if (!targetTemp) {
        throw new CommonError(TEMP_ERROR_CODE['xxx'], '未找到xxx信息');
      }
      try {
        params.updatedBy = operatorId;
        await this.tempRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    } else {
      // 创建
      try {
        params.createdBy = operatorId;
        await this.tempRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    }
  }

  /** 获取xxx列表 */
  async getTemps(
    pageNum: number,
    pageSize: number,
    tempName?: string,
  ): Promise<{ data: Temp[]; page: Page }> {
    try {
      const where: FindOptionsWhere<Temp> = {};
      // todo: 可选名称模糊查询
      if (tempName) {
        where.tempName = Like(`%${tempName}%`);
      }
      const [temps, total] = await this.tempRepository.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where,
        // relations: ['xxx'],
      });
      return {
        data: temps,
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

  /** 获取xxx信息 */
  async getTemp(id: string): Promise<Temp> {
    const targetTemp = await this.tempRepository.findOne({
      where: { id },
      // relations: ['xxx'],
    });

    if (targetTemp) {
      return targetTemp;
    }
  }

  /** 删除xxx */
  async deleteTemp(id: string, operatorId: string): Promise<boolean> {
    const targetTemp = await this.getTemp(id);
    if (!targetTemp) {
      throw new CommonError(TEMP_ERROR_CODE['xxx'], '未找到xxx信息');
    }

    try {
      targetTemp.deletedBy = operatorId;
      await this.tempRepository.softDelete(targetTemp.id);
      return true;
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }
}
