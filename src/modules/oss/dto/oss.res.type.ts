import { createResultClassType } from 'src/common/dto/result.type';
import { OSSType } from './oss.type';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OSSResult extends createResultClassType(OSSType) {}
