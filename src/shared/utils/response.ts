import {
  RESPONSE_CODE,
  RESPONSE_CODE_KEYS,
} from 'src/common/constants/response';
import { Page } from 'src/common/dto/page.type';
import { Result, Results } from 'src/common/dto/result.type';

export const createResult = <T extends object>(
  code: RESPONSE_CODE_KEYS,
  message: string,
  data?: T,
): Result<T> => {
  return {
    code: RESPONSE_CODE[code],
    message,
    data,
  };
};

export const createResults = <T>(
  code: RESPONSE_CODE_KEYS,
  message: string,
  data?: T[],
  page?: Page,
): Results<T> => {
  return {
    code: RESPONSE_CODE[code],
    message,
    data,
    page,
  };
};
