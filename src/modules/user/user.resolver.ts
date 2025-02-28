import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserInput } from './dto/user-input.dto';
import { UserType } from './dto/user.type';
import { UserService } from './user.service';
import { BaseResultClsType, Result } from 'src/common/dto/result.type';
import { UserResult } from './dto/user.res.type';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserResult)
  async find(@Args('id') id: string): Promise<Result<UserType> | null> {
    return this.userService.find(id);
  }

  @Mutation(() => BaseResultClsType)
  async create(@Args('params') params: UserInput): Promise<Result> {
    return this.userService.create(params);
  }

  @Mutation(() => BaseResultClsType)
  async update(
    @Args('id') id: string,
    @Args('params') params: UserInput,
  ): Promise<Result> {
    return this.userService.update(id, params);
  }

  @Mutation(() => BaseResultClsType)
  async del(@Args('id') id: string): Promise<Result> {
    return this.userService.del(id);
  }
}
