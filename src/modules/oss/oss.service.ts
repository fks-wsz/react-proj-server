import { Injectable } from '@nestjs/common';
import { OSSType } from './dto/oss.type';
import * as dayjs from 'dayjs';

import { createResult } from 'src/shared/utils/response';
import { Result } from 'src/common/dto/result.type';
import { createOSSClient } from 'src/shared/utils/oss-client';

@Injectable()
export class OSSService {
  async getOSSSignature(): Promise<Result<OSSType>> {
    const bucket = 'learn-res-static';
    const dir = 'react-project/images/';
    const client = createOSSClient(bucket, dir);

    const date = new Date();
    // 设置签名的有效期，单位为秒。
    date.setSeconds(date.getSeconds() + 3600);
    const policy = {
      expiration: date.toISOString(),
      conditions: [
        // 设置上传文件的大小限制。
        ['content-length-range', 0, 1048576000],
        // 限制可上传的Bucket。
        // { bucket: client.options.bucket },
      ],
    };
    const formData = await client.calculatePostSignature(policy);
    const host = `http://${bucket}.${
      (await client.getBucketLocation(bucket)).location
    }.aliyuncs.com`.toString();

    const params = {
      expire: dayjs().add(1, 'hour').unix().valueOf(),
      policy: formData.policy,
      signature: formData.Signature,
      ossAccessKeyId: formData.OSSAccessKeyId,
      host,
      dir: dir,
    };
    return createResult('SUCCESS', '获取OSS签名成功', params);
  }
}
