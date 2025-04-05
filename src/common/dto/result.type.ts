import { Page } from './page.type';
import { Int, ObjectType, Field } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';

export type BaseResult = {
  code: number;
  message: string;
};

export type Result<T extends object = object> = {
  data?: T;
} & BaseResult;

export type Results<T> = {
  data: T[];
  page: Page;
} & BaseResult;

export type ResultsWithoutPage<T> = Omit<Results<T>, 'page'>;

export const createResultClassType = <T extends object>(
  ItemType?: ClassType<T>,
): ClassType<Result<T>> => {
  @ObjectType()
  class Result {
    @Field(() => Int, { description: '状态码', nullable: false })
    code: number;
    @Field(() => String, { nullable: false })
    message: string;
    @Field(() => ItemType, { nullable: true })
    data?: T;
  }

  return Result;
};

export const createResultsClassType = <T extends object>(
  ItemType: ClassType<T>,
): ClassType<Results<T>> => {
  @ObjectType()
  class Results {
    @Field(() => Int, { description: '状态码' })
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => [ItemType])
    data: T[];
    @Field(() => Page)
    page: Page;
  }

  return Results;
};

export const createResultsClassTypeWithoutPage = <T extends object>(
  ItemType: ClassType<T>,
): ClassType<ResultsWithoutPage<T>> => {
  @ObjectType()
  class ResultsWithoutPage {
    @Field(() => Int, { description: '状态码' })
    code: number;
    @Field(() => String)
    message: string;
    @Field(() => [ItemType])
    data: T[];
  }

  return ResultsWithoutPage;
};

export const createBaseResultClassType = (): ClassType<BaseResult> => {
  @ObjectType()
  class BaseResult {
    @Field(() => Int, { description: '状态码', nullable: false })
    code: number;
    @Field(() => String, { nullable: false })
    message: string;
  }

  return BaseResult;
};

@ObjectType()
export class BaseResultClsType extends createBaseResultClassType() {}
