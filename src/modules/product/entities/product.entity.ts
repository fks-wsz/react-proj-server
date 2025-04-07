import { Organization } from '@/modules/organization/entities/organization.entity';
import CommonEntity from '../../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsUrl, Matches, Min } from 'class-validator';

@Entity('product')
export class Product extends CommonEntity {
  @IsNotEmpty()
  @Column('varchar', {
    comment: '商品名称',
    name: 'name',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column('text', {
    comment: '商品介绍',
    name: 'desc',
    nullable: true,
  })
  desc: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Column('int', {
    comment: '库存总数',
    name: 'stock',
    nullable: false,
    default: 0,
  })
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Column('int', {
    comment: '当前库存',
    name: 'cur_stock',
    nullable: false,
    default: 0,
  })
  curStock: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Column('int', {
    comment: '卖出去多少',
    name: 'buy_num',
    nullable: false,
    default: 0,
  })
  buyNum: number;

  @IsNotEmpty()
  @IsInt()
  @Min(-1)
  @Column('int', {
    comment: '每人限购数',
    name: 'limit_buy_num_person',
    nullable: false,
    default: -1,
  })
  limitBuyNumPerson: number;

  @IsOptional()
  @IsUrl()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, {
    message: '封面图URL必须是图片格式(jpg, jpeg, png, gif, bmp, webp)',
  })
  @Column('text', {
    comment: '封面图',
    name: 'cover_url',
    nullable: true,
  })
  coverUrl: string;

  @IsOptional()
  @IsUrl()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, {
    message: 'banner图URL必须是图片格式(jpg, jpeg, png, gif, bmp, webp)',
  })
  @Column('text', {
    comment: 'banner图',
    name: 'banner_url',
    nullable: true,
  })
  bannerUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @Column('float', {
    comment: '原价',
    name: 'original_price',
    nullable: false,
  })
  originalPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  @Column('float', {
    comment: '优惠价',
    name: 'special_price',
    nullable: true,
  })
  specialPrice: number;

  @ManyToOne(() => Organization, (org) => org.products)
  @JoinColumn({ name: 'org_id' })
  org: Organization;
}
