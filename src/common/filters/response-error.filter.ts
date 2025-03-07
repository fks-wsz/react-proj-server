import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { CommonError, SeedError, UnknownError } from '../exceptions/errors';

@Catch(CommonError, SeedError, UnknownError) // 捕获 CommonError
export class ResponseErrorFilter implements GqlExceptionFilter {
  catch(exception: CommonError) {
    const { code, message } = exception;
    return {
      message: message || 'Error',
      code: code || 500,
    };
  }
}
