import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

/** @name 课程可约时间段(单) */
export class CourseReserverTimeItem {
  @IsString()
  key: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

/** @name 课程可约时间(天) */
export class CourseReserverTimeDay {
  @IsString()
  week: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseReserverTimeItem)
  reserverTimes: CourseReserverTimeItem[];
}

@InputType()
export class CourseReserverTimeItemInput {
  @Field({
    description: '键(用于前端)',
  })
  key: string;

  @Field({
    description: '开始时间',
  })
  startTime: string;

  @Field({
    description: '结束时间',
  })
  endTime: string;
}

@ObjectType()
export class CourseReserverTimeItemType {
  @Field({
    description: '键(用于前端)',
  })
  key: string;

  @Field({
    description: '开始时间',
  })
  startTime: string;

  @Field({
    description: '结束时间',
  })
  endTime: string;
}

@InputType()
export class CourseReserverTimeDayInput {
  @Field({
    description: '周几',
  })
  week: string;

  @Field(() => [CourseReserverTimeItemInput], {
    description: '时间段',
  })
  reserverTimes: CourseReserverTimeItemInput[];
}

@ObjectType()
export class CourseReserverTimeDayType {
  @Field({
    description: '周几',
  })
  week: string;

  @Field(() => [CourseReserverTimeItemType], {
    description: '时间段',
  })
  reserverTimes: CourseReserverTimeItemType[];
}
