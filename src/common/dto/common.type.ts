import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonType {
  @Field({ description: '创建时间' })
  createdAt: Date;

  @Field({ description: '创建人', nullable: true })
  createdBy: string;

  @Field({ description: '更新时间', nullable: true })
  updatedAt: Date;

  @Field({ description: '更新人', nullable: true })
  updatedBy: string;

  @Field({ description: '删除时间', nullable: true })
  deletedAt: Date;

  @Field({ description: '删除人', nullable: true })
  deletedBy: string;
}
