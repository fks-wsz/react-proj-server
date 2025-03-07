import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { User } from './entities/user.entity';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  // 新增一个用户
  async create(entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.userRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    throw new InternalServerException();
  }

  // 删除一个用户
  async del(id: string): Promise<boolean> {
    const res = await this.userRepository.delete(id);
    if (res.affected > 0) {
      return true;
    }
    throw new InternalServerException();
  }

  // 更新一个用户
  async update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    const res = await this.userRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    throw new InternalServerException();
  }

  // 查询一个用户
  async find(id: string): Promise<User | null> {
    const res = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }

  // 根据手机号查询用户
  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const res = await this.userRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    return res;
  }
}
