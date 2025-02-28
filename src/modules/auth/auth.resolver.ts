import { Resolver, Query, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';

import { BaseResultClsType, Result } from 'src/common/dto/result.type';
import { LoginResult } from './dto/auth.res.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * 获取登录验证码
   * @param phoneNumber - 手机号码
   */
  @Query(() => BaseResultClsType, {
    description: '获取登录短信验证码',
  })
  async getLoginSmsMsg(
    @Args('phoneNumber', { description: '手机号码' }) phoneNumber: string,
  ): Promise<Result> {
    return this.authService.setupSendLoginSmsMsg(phoneNumber);
  }

  /**
   * 登录
   * @param phoneNumber - 手机号码
   * @param code - 验证码
   */
  @Query(() => LoginResult, { description: '登录' })
  async login(
    @Args('phoneNumber') phoneNumber: string,
    @Args('code') code: string,
  ): Promise<Result> {
    return this.authService.login(phoneNumber, code);
  }
}
