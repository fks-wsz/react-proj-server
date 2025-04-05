// 响应状态码
export enum COMMON_RESPONSE_CODE {
  /** 成功 */
  SUCCESS = 200,
  /** 用户不存在 */
  USER_NOT_FOUND = 10000,
  /** 门店不存在 */
  ORGANIZATION_NOT_FOUND = 20000,
  /** 服务器错误 */
  SERVER_ERROR = 50000,
  /** 未知错误 */
  UNKNOWN_ERROR = 50001,
  /** 种子错误 */
  SEEDING_ERROR = 90000,
}
export type COMMON_RESPONSE_CODE_KEYS = keyof typeof COMMON_RESPONSE_CODE;
