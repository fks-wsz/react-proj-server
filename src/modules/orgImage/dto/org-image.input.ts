import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrgImageInput {
  @Field({ description: '图片ID', nullable: true })
  id?: string;

  @Field({ description: '图片地址', nullable: false })
  url: string;

  @Field({ description: '备注', nullable: true })
  remark?: string;
}
