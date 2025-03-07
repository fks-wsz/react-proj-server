import { Field, InputType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class PageInput {
  @Field({ description: '页数', nullable: false })
  @IsInt()
  @Min(0)
  pageNum: number;

  @Field({ description: '页大小', nullable: false })
  @IsInt()
  @Min(0)
  pageSize: number;
}
