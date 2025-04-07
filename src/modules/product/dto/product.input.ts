import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsUrl, Matches, Min } from 'class-validator';

@InputType()
export class ProductInput {
  @Field({ description: 'id' })
  id: string;

  @IsNotEmpty()
  @Field({
    description: '商品名称',
  })
  name: string;

  @Field({
    description: '商品介绍',
    nullable: true,
  })
  desc: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Field({
    description: '库存总数',
  })
  stock: number;

  @IsNotEmpty()
  @IsInt()
  @Min(-1)
  @Field({
    description: '每人限购数',
  })
  limitBuyNumPerson: number;

  @IsOptional()
  @IsUrl()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, {
    message: '封面图URL必须是图片格式(jpg, jpeg, png, gif, bmp, webp)',
  })
  @Field({
    description: '封面图',
    nullable: true,
  })
  coverUrl: string;

  @IsOptional()
  @IsUrl()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, {
    message: 'banner图URL必须是图片格式(jpg, jpeg, png, gif, bmp, webp)',
  })
  @Field({
    description: 'banner图',
    nullable: true,
  })
  bannerUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @Field({
    description: '原价',
  })
  originalPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  @Field({
    description: '优惠价',
    nullable: true,
  })
  specialPrice: number;
}
