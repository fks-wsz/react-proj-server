import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CommonError } from '../exceptions/errors';
import { COMMON_RESPONSE_CODE } from '../constants/response';
import { OrganizationService } from '@/modules/organization/organization.service';

@Injectable()
export class OrgCheckGuard implements CanActivate {
  constructor(private readonly organizationService: OrganizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const req = gqlCtx.getContext().req;
    const headers = req.headers;
    const { orgid } = headers;
    if (!orgid) {
      return false;
    }

    const targetOrg = await this.organizationService.getOrganization(orgid);

    if (targetOrg) {
      return true;
    } else {
      throw new CommonError(COMMON_RESPONSE_CODE['ORGANIZATION_NOT_FOUND'], '门店不存在');
    }
  }
}
