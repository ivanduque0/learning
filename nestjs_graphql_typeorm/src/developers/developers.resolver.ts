import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DevelopersService } from './developers.service';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { UpdateDeveloperInput } from './dto/update-developer.input';

@Resolver(() => Developer)
export class DevelopersResolver {
  constructor(private developersService: DevelopersService) {}

  @Mutation(() => Developer)
  createDeveloper(@Args('createDeveloperInput') createDeveloperInput: CreateDeveloperInput) {
    return this.developersService.create(createDeveloperInput);
  }

  @Query(() => [Developer], { name: 'developers' })
  findAll() {
    return this.developersService.findAll();
  }

  @Query(() => Developer, { name: 'developer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.developersService.findOne(id);
  }

  @Mutation(() => Developer)
  updateDeveloper(@Args('updateDeveloperInput') updateDeveloperInput: UpdateDeveloperInput): Promise<Developer> {
    this.developersService.update(updateDeveloperInput);
    return this.developersService.findOne(updateDeveloperInput.id);
  }

  @Mutation(() => Developer)
  removeDeveloper(@Args('id', { type: () => Int }) id: number) {
    let developer = this.developersService.findOne(id);
    this.developersService.remove(id);
    return developer;
  }

  @Mutation(() => Developer, { name: 'addRoleToDeveloper' })
  addToRole(
      @Args('developerId', { type: () => Int, nullable: false }) developerId: number,
      @Args('roleId', { type: () => Int, nullable: false }) roleId: number,
  ) {
      return this.developersService.addToRole(developerId, roleId);
  }

  @Mutation(() => Developer, { name: 'removeDeveloperFromRole' })
  removeFromRole(
      @Args('developerId', { type: () => Int, nullable: false }) developerId: number,
      @Args('roleId', { type: () => Int, nullable: false }) roleId: number,
  ) {
      return this.developersService.removeFromRole(developerId, roleId);
  }
}
