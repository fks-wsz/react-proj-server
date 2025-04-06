import { CourseType } from '@/modules/course/dto/course.type';
import { OrganizationType } from '@/modules/organization/dto/organization.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonType } from 'src/common/dto/common.type';
import { CardType } from '../types';

@ObjectType()
export class CardObjType extends CommonType {
  @Field({ description: 'id' })
  id: string;

  @Field({ description: '名称' })
  name: string;

  @Field(() => CardType, { description: '消费卡类型' })
  type: string;

  @Field({
    description: '剩余次数',
  })
  times: number;

  @Field({
    description: '剩余有效期(天)',
  })
  days: number;

  @Field(() => CourseType, {
    description: '所属课程',
  })
  course: CourseType;

  @Field(() => OrganizationType, {
    description: '所属门店',
  })
  org: OrganizationType;
}
