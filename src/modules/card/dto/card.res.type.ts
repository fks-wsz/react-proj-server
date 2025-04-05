import { ObjectType } from '@nestjs/graphql';

import {
  createResultClassType,
  createResultsClassTypeWithoutPage,
} from 'src/common/dto/result.type';
import { CardObjType } from './card.type';

@ObjectType()
export class CardResult extends createResultClassType(CardObjType) {}

@ObjectType()
export class CardResultsWithoutPage extends createResultsClassTypeWithoutPage(CardObjType) {}
