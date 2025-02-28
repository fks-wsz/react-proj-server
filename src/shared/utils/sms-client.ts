import * as OpenApi from '@alicloud/openapi-client';
import Dysmsapi20170525 from '@alicloud/dysmsapi20170525';

const smsClientMemo = new Map<string, Dysmsapi20170525>();

export const createSmsClient = (accessKeyId: string, accessKeySecret: string) => {
  const smsClientMemoKey = `${accessKeyId}-${accessKeySecret}`;

  const isSmsClientExist = smsClientMemo.has(smsClientMemoKey);
  if (isSmsClientExist) {
    return smsClientMemo.get(smsClientMemoKey);
  }

  const config = new OpenApi.Config({
    // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
    accessKeyId: accessKeyId,
    // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
    accessKeySecret: accessKeySecret,
  });
  // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
  config.endpoint = `dysmsapi.aliyuncs.com`;

  const client = new Dysmsapi20170525(config);
  smsClientMemo.set(smsClientMemoKey, client);

  return client;
};
