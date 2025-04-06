import { ObjectType } from '@nestjs/graphql';

import { createResultClassType, createResultsClassType } from 'src/common/dto/result.type';
import { ProductType } from './product.type';

@ObjectType()
export class ProductResult extends createResultClassType(ProductType) {}

@ObjectType()
export class ProductResults extends createResultsClassType(ProductType) {}
