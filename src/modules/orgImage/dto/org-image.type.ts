import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrgImageType {
  @Field({ description: '图片ID', nullable: false })
  id: string;

  @Field({ description: '图片地址', nullable: false })
  url: string;

  @Field({ description: '备注', nullable: true })
  remark?: string;
}
