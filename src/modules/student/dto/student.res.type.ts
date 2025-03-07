import { ObjectType } from '@nestjs/graphql';

import { createResultClassType, createResultsClassType } from 'src/common/dto/result.type';
import { StudentType } from './student.type';

@ObjectType()
export class StudentResult extends createResultClassType(StudentType) {}

@ObjectType()
export class StudentResults extends createResultsClassType(StudentType) {}
