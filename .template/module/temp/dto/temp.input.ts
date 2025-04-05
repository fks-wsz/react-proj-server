import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TempInput {
  @Field({ description: 'id' })
  id: string;
}
