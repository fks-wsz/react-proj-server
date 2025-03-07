import { COMMON_RESPONSE_CODE, COMMON_RESPONSE_CODE_KEYS } from 'src/common/constants/response';
import { Page } from 'src/common/dto/page.type';
import { Result, Results } from 'src/common/dto/result.type';

function isCommonResponseCodeKey(code: string | number): code is COMMON_RESPONSE_CODE_KEYS {
  return code in COMMON_RESPONSE_CODE;
}

export const createResult = <C extends number, T extends object>(
  code: COMMON_RESPONSE_CODE_KEYS | C,
  message: string,
  data?: T,
): Result<T> => {
  return {
    code: isCommonResponseCodeKey(code) ? COMMON_RESPONSE_CODE[code] : code,
    message,
    data,
  };
};

export const createResults = <C extends number, T extends object>(
  code: COMMON_RESPONSE_CODE_KEYS | C,
  message: string,
  data?: T[],
  page?: Page,
): Results<T> => {
  return {
    code: isCommonResponseCodeKey(code) ? COMMON_RESPONSE_CODE[code] : code,
    message,
    data,
    page,
  };
};
