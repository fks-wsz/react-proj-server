import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, DeepPartial } from 'typeorm';
import { createResult } from 'src/shared/utils/response';
import { Result } from 'src/common/dto/result.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 新增一个用户
  async create(entity: DeepPartial<User>): Promise<Result> {
    const res = await this.userRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return createResult('SUCCESS', '新增用户成功');
    }
    return createResult('SERVER_ERROR', '新增用户失败');
  }

  // 删除一个用户
  async del(id: string): Promise<Result> {
    const res = await this.userRepository.delete(id);
    if (res.affected > 0) {
      return createResult('SUCCESS', '删除用户成功');
    }
    return createResult('SERVER_ERROR', '删除用户失败');
  }

  // 更新一个用户
  async update(id: string, entity: DeepPartial<User>): Promise<Result> {
    const res = await this.userRepository.update(id, entity);
    if (res.affected > 0) {
      return createResult('SUCCESS', '更新用户成功');
    }
    return createResult('SERVER_ERROR', '更新用户失败');
  }

  // 查询一个用户
  async find(id: string): Promise<Result<User> | null> {
    const res = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (res !== null) {
      return createResult('SUCCESS', '查询用户成功', res);
    }
    return null;
  }

  // 根据手机号查询用户
  async findUserByPhoneNumber(
    phoneNumber: string,
  ): Promise<Result<User> | null> {
    const res = await this.userRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    if (res !== null) {
      return createResult('SUCCESS', '查询用户成功', res);
    }
    return null;
  }
}
