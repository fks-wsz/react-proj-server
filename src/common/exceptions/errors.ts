import { COMMON_RESPONSE_CODE } from '../constants/response';

export class CommonError extends Error {
  public readonly code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export class UnknownError extends CommonError {
  constructor(message: string) {
    super(COMMON_RESPONSE_CODE['UNKNOWN_ERROR'], message);
  }
}

export class SeedError extends CommonError {
  constructor(message: string) {
    super(COMMON_RESPONSE_CODE['SEEDING_ERROR'], message);
  }
}
