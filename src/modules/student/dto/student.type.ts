import { CommonType } from 'src/common/dto/common.type';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * 学员
 */
@ObjectType()
export class StudentType extends CommonType {
  @Field({
    description: 'id',
  })
  id: string;

  @Field({
    description: '昵称',
  })
  nickname: string;

  @Field({
    description: '真实姓名',
  })
  realName: string;

  @Field({
    description: '账号',
  })
  account: string;

  @Field({
    description: '手机号',
  })
  phoneNumber: string;

  @Field({
    description: '头像',
    nullable: true,
  })
  avatarUrl: string;
}
