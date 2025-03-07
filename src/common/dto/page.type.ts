import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Page {
  @Field(() => Int, { description: '总数' })
  total: number;
  @Field(() => Int, { description: '页数' })
  pageNum?: number;
  @Field(() => Int, { description: '页大小' })
  pageSize?: number;
}
