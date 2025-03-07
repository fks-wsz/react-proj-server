import { Field, InputType } from '@nestjs/graphql';
import { OrgImageInput } from 'src/modules/orgImage/dto/org-image.input';

@InputType()
export class OrganizationInput {
  @Field({ description: 'id' })
  id: string;

  @Field({ description: '营业执照' })
  businessLicenseUrl: string;

  @Field({ description: '身份证正面' })
  idCardFrontUrl: string;

  @Field({ description: '身份证反面' })
  idCardBackUrl: string;

  @Field({ description: '标签 逗号分隔', nullable: true })
  tags?: string;

  @Field({ description: '机构简介', nullable: true })
  description?: string;

  @Field({ description: '机构名称' })
  organizationName: string;

  @Field({ description: '门店logo', nullable: true })
  logoUrl?: string;

  @Field({ description: '地址', nullable: true })
  address?: string;

  @Field({ description: '经度', nullable: true })
  longitude?: string;

  @Field({ description: '经度', nullable: true })
  latitude?: string;

  @Field({ description: '电话', nullable: true })
  phoneNumber?: string;

  @Field(() => [OrgImageInput], { description: '门店图片', nullable: true })
  orgFrontImg?: OrgImageInput[];

  @Field(() => [OrgImageInput], { description: '房间图片', nullable: true })
  orgRoomImg?: OrgImageInput[];

  @Field(() => [OrgImageInput], { description: '其他图片', nullable: true })
  orgOtherImg?: OrgImageInput[];
}
