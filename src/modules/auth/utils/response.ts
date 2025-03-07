export enum AUTH_RESPONSE_CODE {
  /** 一分钟一次验证码 */
  SEND_SMS_IN_ONE_MIN_LIMIT = 10001,
  /** 发送验证码失败 */
  SEND_SMS_FAILED = 10002,
  /** 验证码错误 */
  VALIDATE_CODE_ERROR = 10003,
  /** 验证码过期 */
  VALIDATE_CODE_EXPIRED = 10004,
}
