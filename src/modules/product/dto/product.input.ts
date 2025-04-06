import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field({ description: 'id' })
  id: string;
}
