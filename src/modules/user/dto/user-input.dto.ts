import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ description: '用户名', nullable: false })
  name: string;

  @Field({ description: '个人签名', nullable: true })
  desc: string;

  @Field({ description: '头像OSS地址', nullable: true })
  avatarUrl: string;
}
