import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Page {
  @Field(() => Int, { description: '总数' })
  total: number;
  @Field(() => Int, { description: '起始项' })
  start?: number;
  @Field(() => Int, { description: '页总数' })
  length?: number;
}
