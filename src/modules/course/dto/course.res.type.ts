import { ObjectType } from '@nestjs/graphql';

import { createResultClassType, createResultsClassType } from 'src/common/dto/result.type';
import { CourseType } from './course.type';

@ObjectType()
export class CourseResult extends createResultClassType(CourseType) {}

@ObjectType()
export class CourseResults extends createResultsClassType(CourseType) {}
