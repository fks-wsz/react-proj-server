import { ObjectType } from '@nestjs/graphql';

import { createResultClassType, createResultsClassType } from 'src/common/dto/result.type';
import { PartialProductType } from './product.type';

@ObjectType()
export class ProductResult extends createResultClassType(PartialProductType) {}

@ObjectType()
export class ProductResults extends createResultsClassType(PartialProductType) {}
