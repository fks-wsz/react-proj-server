import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field({ description: '用户ID' })
  id?: string;
  @Field({ description: '用户名' })
  name?: string;
  @Field({ description: '描述' })
  desc: string;
  @Field({ description: '账号' })
  account: string;
  @Field({ description: '手机号' })
  phoneNumber: string;
  @Field({ description: '头像OSS地址', nullable: true })
  avatarUrl?: string;
}
