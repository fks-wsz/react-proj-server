import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { CommonType } from 'src/common/dto/common.type';
import { OrgImage } from 'src/modules/orgImage/entities/org-image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('organization')
export class Organization extends CommonType {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @IsUrl()
  @IsNotEmpty()
  @Column({
    name: 'business_license_url',
    comment: '营业执照',
    type: 'text',
    nullable: false,
  })
  businessLicenseUrl: string;

  @IsUrl()
  @IsNotEmpty()
  @Column({
    name: 'id_card_front_url',
    comment: '身份证正面',
    type: 'text',
    nullable: false,
  })
  idCardFrontUrl: string;

  @IsUrl()
  @IsNotEmpty()
  @Column({
    name: 'id_card_back_url',
    comment: '身份证反面',
    type: 'text',
    nullable: false,
  })
  idCardBackUrl: string;

  @IsString()
  @Column({
    name: 'tags',
    comment: '标签 逗号分隔',
    type: 'text',
    nullable: true,
  })
  tags: string;

  @IsString()
  @Column({
    name: 'description',
    comment: '机构简介',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'organization_name',
    comment: '机构名称',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  organizationName: string;

  @Column({
    name: 'logo_url',
    comment: '门店logo',
    type: 'text',
    nullable: true,
  })
  logoUrl: string;

  @Column({
    name: 'address',
    comment: '地址',
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'longitude',
    comment: '经度',
    type: 'text',
    nullable: true,
  })
  longitude: string;

  @Column({
    name: 'latitude',
    comment: '经度',
    type: 'text',
    nullable: true,
  })
  latitude: string;

  @Column({
    name: 'phone_number',
    comment: '电话',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  phoneNumber: string;

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForFront, {
    cascade: true,
  })
  orgFrontImg?: OrgImage[];

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForRoom, {
    cascade: true,
  })
  orgRoomImg?: OrgImage[];

  @OneToMany(() => OrgImage, (orgImage) => orgImage.orgIdForOther, {
    cascade: true,
  })
  orgOtherImg?: OrgImage[];
}
