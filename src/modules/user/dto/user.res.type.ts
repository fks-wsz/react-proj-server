import { ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';
import { createResultClassType } from 'src/common/dto/result.type';

@ObjectType()
export class UserResult extends createResultClassType(UserType) {}
