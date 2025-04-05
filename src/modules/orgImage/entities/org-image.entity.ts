import { Organization } from '../../organization/entities/organization.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 机构资源
 */
@Entity('org_image')
export class OrgImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({
    name: 'url',
    type: 'text',
    comment: '图片地址',
    nullable: false,
  })
  url: string;

  @Column({
    name: 'remark',
    comment: '备注',
    nullable: true,
  })
  remark?: string;

  @ManyToOne(() => Organization, (org) => org.orgFrontImg)
  @JoinColumn({ name: 'org_id_for_front' })
  orgIdForFront?: Organization;

  @ManyToOne(() => Organization, (org) => org.orgRoomImg)
  @JoinColumn({ name: 'org_id_for_room' })
  orgIdForRoom?: Organization;

  @ManyToOne(() => Organization, (org) => org.orgOtherImg)
  @JoinColumn({ name: 'org_id_for_other' })
  orgIdForOther?: Organization;
}
