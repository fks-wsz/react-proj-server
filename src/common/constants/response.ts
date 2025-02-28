// 响应状态码
export enum RESPONSE_CODE {
  /** 成功 */
  SUCCESS = 200,
  /** 用户不存在 */
  USER_NOT_FOUND = 10000,
  /** 验证码错误 */
  VALIDATE_CODE_ERROR = 10001,
  /** 验证码过期 */
  VALIDATE_CODE_EXPIRED = 10002,
  /** 服务器错误 */
  SERVER_ERROR = 50000,
  /** 未知错误 */
  UNKNOWN_ERROR = 50001,
}
export type RESPONSE_CODE_KEYS = keyof typeof RESPONSE_CODE;
