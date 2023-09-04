import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DevelopersService } from './developers.service';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { UpdateDeveloperInput } from './dto/update-developer.input';
import { FilterDevelopersInput } from './dto/filter-developers.input';

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
    return this.developersService.findOneById(id);
  }

  @Query(()=> [Developer])
  findByRolesAndProjects(@Args('filterDeveloperInput') filterDeveloperInput: FilterDevelopersInput): Promise<Developer[]> {
      return this.developersService.findByRolesAndProjects(filterDeveloperInput); 
  }

  @Mutation(() => Developer)
  updateDeveloper(@Args('updateDeveloperInput') updateDeveloperInput: UpdateDeveloperInput) {
    return this.developersService.update(updateDeveloperInput);
  }

  @Mutation(() => Developer)
  removeDeveloper(@Args('id', { type: () => Int }) id: number) {
    return this.developersService.remove(id);
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
