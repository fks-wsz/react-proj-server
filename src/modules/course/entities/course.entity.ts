import { IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import CommonEntity from '../../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CourseReserverTimeDay } from '../dto/course-reserver-time.dto';
import { Organization } from '@/modules/organization/entities/organization.entity';
import { Card } from '@/modules/card/entities/card.entity';

@Entity('course')
export class Course extends CommonEntity {
  @Column({
    name: 'name',
    comment: '课程名称',
    nullable: false,
    type: 'varchar',
  })
  @IsNotEmpty()
  name: string;

  @Column({
    name: 'description',
    comment: '课程简介',
    nullable: true,
    type: 'text',
  })
  @IsString()
  description: string;

  @Column({
    name: 'fit_people',
    comment: '适宜人群',
    nullable: false,
    type: 'varchar',
  })
  @IsNotEmpty()
  @IsString()
  fitPeople: string;

  @Column({
    name: 'base_ability',
    comment: '适合基础',
    nullable: false,
    type: 'varchar',
  })
  @IsNotEmpty()
  baseAbility: string;

  @Column({
    name: 'sections',
    comment: '课程节数',
    nullable: false,
    type: 'smallint',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sections: number;

  @Column({
    name: 'section_duration',
    comment: '单节课时长(min)',
    nullable: false,
    type: 'smallint',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sectionDuration: number;

  @Column({
    name: 'stu_count',
    comment: '学员数量',
    default: 0,
    nullable: false,
    type: 'int',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stuCount: number;

  @Column({
    name: 'reserver_info',
    comment: '预约信息',
    nullable: true,
    type: 'text',
  })
  @IsString()
  reserveInfo: string;

  @Column({
    name: 'refund_info',
    comment: '退款信息',
    nullable: true,
    type: 'text',
  })
  @IsString()
  refundInfo: string;

  @Column({
    name: 'other_info',
    comment: '其他说明信息',
    nullable: true,
    type: 'text',
  })
  @IsString()
  otherInfo: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseReserverTimeDay)
  @Column('simple-json', {
    name: 'reserver_time',
    comment: '可约时间',
    nullable: true,
  })
  reserverTimes: CourseReserverTimeDay[];

  @ManyToOne(() => Organization, (org) => org.courses)
  @JoinColumn({ name: 'org_id' })
  org: Organization;

  @OneToMany(() => Card, (card) => card.course, {
    cascade: true,
  })
  cards: Card[];
}
