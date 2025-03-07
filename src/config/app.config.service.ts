import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService extends ConfigService {
  __DEV__ = this.get<string>('NODE_ENV') === 'development';
}

export const appConfigService = new AppConfigService();
