import { ObjectType } from '@nestjs/graphql';

import { createResultClassType, createResultsClassType } from 'src/common/dto/result.type';
import { TempType } from './temp.type';

@ObjectType()
export class TempResult extends createResultClassType(TempType) {}

@ObjectType()
export class TempResults extends createResultsClassType(TempType) {}
