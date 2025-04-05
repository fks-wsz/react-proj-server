import { Field, InputType } from '@nestjs/graphql';
import { CardType } from '../types';
import { IsInt, IsNotEmpty, Min, ValidateIf } from 'class-validator';

@InputType()
export class CardInput {
  @Field({ description: 'id', nullable: true })
  id: string;

  @Field({
    description: '消费卡名称',
  })
  name: string;

  @Field(() => CardType, { description: '消费卡类型' })
  type: CardType;

  @ValidateIf((input) => input.type === CardType['TIMES'])
  @IsNotEmpty({ message: '必须填写次卡剩余次数' })
  @IsInt()
  @Min(0)
  @Field({
    description: '剩余次数',
    nullable: true,
  })
  times: number;

  @ValidateIf((input) => input.type === CardType['DURATION'])
  @IsNotEmpty({ message: '必须填写时长卡有效期' })
  @IsInt()
  @Min(0)
  @Field({
    description: '剩余有效期(天)',
    nullable: true,
  })
  days: number;

  @Field({ description: '课程ID' })
  courseId: string;
}
