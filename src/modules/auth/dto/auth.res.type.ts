import { ObjectType } from '@nestjs/graphql';
import { createResultClassType } from 'src/common/dto/result.type';
import { LoginType } from './auth.type';

@ObjectType()
export class LoginResult extends createResultClassType(LoginType) {}
