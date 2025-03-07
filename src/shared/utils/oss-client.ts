import * as OSS from 'ali-oss';
import { appConfigService } from 'src/config/app.config.service';

// OSS Client缓存。
const clientMemo = new Map<string, OSS>();

export const createOSSClient = (bucket: string, dir: string): OSS => {
  const clientMemoKey = `${bucket}-${dir}`;
  // 若clientMemo中已存在对应的OSSClient，则直接返回。
  const isOSSClientExist = clientMemo.has(clientMemoKey);
  if (isOSSClientExist) {
    return clientMemo.get(clientMemoKey);
  }

  const config = {
    // 配置环境变量ALIBABA_CLOUD_ACCESS_KEY_ID。
    accessKeyId: appConfigService.get<string>('ACCESS_KEY_ID'),
    // 配置环境变量ALIBABA_CLOUD_ACCESS_KEY_SECRET。
    accessKeySecret: appConfigService.get<string>('ACCESS_KEY_SECRET'),
    // 将<YOUR-BUCKET>替换为Bucket名称。
    bucket: bucket,
    // 指定上传到OSS的文件前缀。
    dir: dir,
  };

  const client = new OSS(config);
  clientMemo.set(clientMemoKey, client);

  return client;
};
