import { Field, ObjectType } from '@nestjs/graphql';
import { CommonType } from 'src/common/dto/common.type';

@ObjectType()
export class ProductType extends CommonType {
  @Field({ description: 'id' })
  id: string;
}
