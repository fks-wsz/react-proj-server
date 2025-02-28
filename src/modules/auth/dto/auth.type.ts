import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field(() => String, { description: 'token', nullable: true })
  token?: string;
}
