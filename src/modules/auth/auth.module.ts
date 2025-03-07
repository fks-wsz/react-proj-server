import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/constants/secret';
import { JwtStrategy } from './jwt.strategy';
import { AppConfigService } from 'src/config/app.config.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: 60 * 60 * 24 * 7 + 's' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy, AppConfigService],
})
export class AuthModule {}
