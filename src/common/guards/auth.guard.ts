import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { IS_DEV_ONLY_KEY } from '../decorators/is-dev-only.decorator';

import { appConfigService } from 'src/config/app.config.service';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isDevOnly = this.reflector.getAllAndOverride<boolean>(IS_DEV_ONLY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isDevOnly && appConfigService.__DEV__) {
      // 是开发接口，且当前环境是开发环境，不需要验证
      return true;
    }

    if (isPublic) {
      // 是公共接口，不需要验证
      return true;
    }

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
