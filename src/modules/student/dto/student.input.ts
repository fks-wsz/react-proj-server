import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentInput {
  @Field({
    description: 'id',
  })
  id: string;

  @Field({
    description: '昵称',
  })
  nickname: string;

  @Field({
    description: '手机号',
  })
  phoneNumber: string;

  @Field({
    description: '头像',
  })
  avatarUrl: string;
}
