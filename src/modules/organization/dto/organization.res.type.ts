import { ObjectType } from '@nestjs/graphql';

import { createResultClassType, createResultsClassType } from 'src/common/dto/result.type';
import { OrganizationType } from './organization.type';

@ObjectType()
export class OrganizationResult extends createResultClassType(OrganizationType) {}

@ObjectType()
export class OrganizationResults extends createResultsClassType(OrganizationType) {}
