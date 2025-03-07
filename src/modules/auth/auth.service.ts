import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/config/app.config.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as Dysmsapi from '@alicloud/dysmsapi20170525';
import * as Util from '@alicloud/tea-util';
import { getRandomString } from 'src/shared/utils';
import { createSmsClient } from 'src/shared/utils/sms-client';

import * as dayjs from 'dayjs';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import { AUTH_RESPONSE_CODE } from './utils/response';
import { COMMON_RESPONSE_CODE } from 'src/common/constants/response';
import { CommonError, UnknownError } from 'src/common/exceptions/errors';
import { InternalServerException } from 'src/common/exceptions/http-exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly appConfigService: AppConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 发送登录短信验证码
   * @param phoneNumber - 手机号码
   */
  async sendLoginSmsMsg(phoneNumber: string): Promise<boolean> {
    const targetUser = await this.userService.findUserByPhoneNumber(phoneNumber);
    // 用户不存在
    if (targetUser === null) {
      throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '用户不存在');
    }

    const { loginCodeCreateAt, loginCode } = targetUser;
    if (loginCode !== null) {
      // 若用户存在且验证码存在
      const diffTime = dayjs().diff(dayjs(loginCodeCreateAt));
      if (diffTime < 60 * 1000) {
        // 若验证码在一分钟内发送过 则拒绝发送
        throw new CommonError(
          AUTH_RESPONSE_CODE['SEND_SMS_IN_ONE_MIN_LIMIT'],
          '一分钟内只能发送一次',
        );
      }
    }

    const code = getRandomString(4);

    const sendSmsRequest = new Dysmsapi.SendSmsRequest({
      signName: this.appConfigService.get<string>('LOGIN_SMS_SIGN_NAME'),
      templateCode: this.appConfigService.get<string>('LOGIN_SMS_TEMPLATE_CODE'),
      phoneNumbers: phoneNumber,
      templateParam: `{"code":"${code}"}`,
    });
    const runtime = new Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      const accessKeyId = this.appConfigService.get<string>('ACCESS_KEY_ID');
      const accessKeySecret = this.appConfigService.get<string>('ACCESS_KEY_SECRET');
      const client = createSmsClient(accessKeyId, accessKeySecret);

      await client.sendSmsWithOptions(sendSmsRequest, runtime);
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      // 错误 message
      console.log(error.message);
      // 诊断地址
      console.log(error?.data?.['Recommend']);
      // 验证码发送失败
      throw new UnknownError('验证码发送失败');
    }
    // 发送验证码成功，更新数据库中的验证码
    await this.updateUserLoginCode(phoneNumber, code);
    return true;
  }

  /**
   * 更新用户的验证码数据
   * @param phoneNumber - 手机号码
   * @param code - 验证码
   */
  async updateUserLoginCode(phoneNumber: string, code: string): Promise<boolean> {
    try {
      const targetUser = await this.userRepository.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });
      if (targetUser !== null) {
        // 如果用户存在，则更新用户的验证码
        targetUser.loginCode = code;
        await this.userRepository.save(targetUser);
        return true;
      } else {
        throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '用户不存在');
      }
    } catch (err: unknown) {
      console.error(err);
      throw new InternalServerException();
    }
  }

  /**
   * 登录
   * @param phoneNumber - 手机号码
   * @param code - 验证码
   */
  async login(phoneNumber: string, code: string): Promise<string> {
    const targetUser = await this.userService.findUserByPhoneNumber(phoneNumber);
    // 没有对应用户
    if (targetUser === null) {
      throw new CommonError(COMMON_RESPONSE_CODE['USER_NOT_FOUND'], '用户不存在');
    }
    const { loginCode, loginCodeCreateAt } = targetUser;

    // 若验证码或验证码创建时间不存在，则返回false
    if (!loginCodeCreateAt || !loginCode) {
      throw new InternalServerException();
    }

    if (loginCode === code) {
      // 若验证码正确
      const diffTime = dayjs().diff(dayjs(loginCodeCreateAt));
      if (diffTime < 5 * 60 * 1000) {
        // 若验证码在5分钟内 且 有效
        const token = this.jwtService.sign({ id: targetUser.id });
        return token;
      } else {
        throw new CommonError(AUTH_RESPONSE_CODE['VALIDATE_CODE_EXPIRED'], '验证码过期');
      }
    } else {
      throw new CommonError(AUTH_RESPONSE_CODE['VALIDATE_CODE_ERROR'], '验证码错误');
    }
  }
}
