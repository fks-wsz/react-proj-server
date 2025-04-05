import { Field, ObjectType } from '@nestjs/graphql';
import { CommonType } from 'src/common/dto/common.type';
import { CourseReserverTimeDayType } from './course-reserver-time.dto';

@ObjectType()
export class CourseType extends CommonType {
  @Field({ description: 'id' })
  id: string;

  @Field({
    description: '课程名称',
  })
  name: string;

  @Field({
    description: '课程简介',
    nullable: true,
  })
  description?: string;

  @Field({
    description: '适宜人群',
  })
  fitPeople: string;

  @Field({
    description: '适合基础',
  })
  baseAbility: string;

  @Field({
    description: '课程节数',
  })
  sections: number;

  @Field({
    description: '单节课时长(min)',
  })
  sectionDuration: number;

  @Field({
    description: '学员数量',
  })
  stuCount: number;

  @Field({
    description: '预约信息',
    nullable: true,
  })
  reserveInfo?: string;

  @Field({
    description: '退款信息',
    nullable: true,
  })
  refundInfo?: string;

  @Field({
    description: '其他说明信息',
    nullable: true,
  })
  otherInfo?: string;

  @Field(() => [CourseReserverTimeDayType], {
    description: '可约时间',
    nullable: true,
  })
  reserverTimes: CourseReserverTimeDayType[];
}
