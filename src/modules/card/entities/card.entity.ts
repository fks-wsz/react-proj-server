import CommonEntity from '../../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CardType } from '../types';
import { Course } from '@/modules/course/entities/course.entity';
import { Organization } from '@/modules/organization/entities/organization.entity';

@Entity('card')
export class Card extends CommonEntity {
  @Column('varchar', {
    name: 'name',
    comment: '消费卡名称',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('enum', {
    name: 'type',
    enum: CardType,
    comment: '消费卡类型',
    default: CardType['TIMES'],
    nullable: false,
  })
  type: CardType;

  @Column('smallint', {
    name: 'times',
    comment: '次数',
    default: 0,
    nullable: true,
  })
  times: number;

  @Column('smallint', {
    name: 'days',
    comment: '有效期(天)',
    default: 0,
    nullable: true,
  })
  days: number;

  @ManyToOne(() => Course, (course) => course.cards)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Organization, (org) => org.cards)
  @JoinColumn({ name: 'org_id' })
  org: Organization;
}
