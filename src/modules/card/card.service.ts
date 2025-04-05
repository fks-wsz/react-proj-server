import { Injectable } from '@nestjs/common';

import { CommonError } from 'src/common/exceptions/errors';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CARD_ERROR_CODE } from './utils/response';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async commitCard(params: DeepPartial<Card>, operatorId: string): Promise<boolean> {
    const { id } = params;
    if (id) {
      // 更新
      const targetCard = await this.cardRepository.findOne({ where: { id } });
      if (!targetCard) {
        throw new CommonError(CARD_ERROR_CODE['CARD_NOT_FOUND'], '未找到消费卡信息');
      }
      try {
        params.updatedBy = operatorId;
        await this.cardRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    } else {
      // 创建
      try {
        params.createdBy = operatorId;
        await this.cardRepository.save(params);
        return true;
      } catch (err: unknown) {
        console.error(err);
        throw new InternalServerException();
      }
    }
  }

  /** 获取消费卡列表 */
  async getCards(courseId: string, orgId: string, name?: string): Promise<Card[]> {
    try {
      const where: FindOptionsWhere<Card> = {
        course: {
          id: courseId,
        },
        org: {
          id: orgId,
        },
      };
      // todo: 可选名称模糊查询
      if (name) {
        where.name = Like(`%${name}%`);
      }
      const [cards] = await this.cardRepository.findAndCount({
        where,
        // relations: ['消费卡'],
      });
      return cards;
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }

  /** 获取消费卡信息 */
  async getCard(id: string): Promise<Card> {
    const targetCard = await this.cardRepository.findOne({
      where: { id },
      relations: ['course', 'org'],
    });

    if (targetCard) {
      return targetCard;
    }
  }

  /** 删除消费卡 */
  async deleteCard(id: string, operatorId: string): Promise<boolean> {
    const targetCard = await this.getCard(id);
    if (!targetCard) {
      throw new CommonError(CARD_ERROR_CODE['消费卡'], '未找到消费卡信息');
    }

    try {
      targetCard.deletedBy = operatorId;
      await this.cardRepository.softDelete(targetCard.id);
      return true;
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }
}
