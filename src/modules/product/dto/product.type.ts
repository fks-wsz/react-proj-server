import { OrganizationType } from '@/modules/organization/dto/organization.type';
import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CommonType } from 'src/common/dto/common.type';

@ObjectType()
export class ProductType extends CommonType {
  @Field({ description: 'id' })
  id: string;

  @Field({
    description: '商品名称',
  })
  name: string;

  @Field({
    description: '商品介绍',
  })
  desc: string;

  @Field({
    description: '库存总数',
  })
  stock: number;

  @Field({
    description: '当前库存',
  })
  curStock: number;

  @Field({
    description: '卖出去多少',
  })
  buyNum: number;

  @Field({
    description: '每人限购数',
  })
  limitBuyNumPerson: number;

  @Field({
    description: '封面图',
  })
  coverUrl: string;

  @Field({
    description: 'banner图',
  })
  bannerUrl: string;

  @Field({
    description: '原价',
  })
  originalPrice: number;

  @Field({
    description: '优惠价',
  })
  specialPrice: number;

  @Field(() => OrganizationType, { description: '门店信息' })
  org: OrganizationType;
}

@ObjectType()
export class PartialProductType extends PartialType(ProductType) {}
