import { Args, Int, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { Role } from "../roles/entities/role.entity";
import { UpdateProjectInput } from './dto/update-project.input';
import { FilterProjectsInput } from './dto/filter-projects.input';

@Resolver()
export class ProjectsResolver {

    constructor(private projectsService: ProjectsService) {}

    @Query(()=> [Project])
    findAll() {
        return this.projectsService.findAll(); 
    }

    @Query(()=> Project)
    findOne(@Args('id', {type: ()=> Int}) id:number) {
        return this.projectsService.findOne(id); 
    }

    @Query(()=> [Project])
    findByRolesAndStatuses(@Args('filterProjectInput') filterProjectInput: FilterProjectsInput): Promise<Project[]> {
        return this.projectsService.findByRolesAndStatuses(filterProjectInput); 
    }

    @Mutation(() => Project)
    createProject(@Args('projectInput') projectInput: CreateProjectInput){
        return this.projectsService.createProject(projectInput)
    }

    @Mutation(() => Project)
    updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
        return this.projectsService.update(updateProjectInput);
    }
  
    @Mutation(() => Project)
    removeProject(@Args('id', { type: () => Int }) id: number) {
      return this.projectsService.remove(id);
    }

    @Mutation(() => Project, { name: 'addRoleToProject' })
    addToRole(
        @Args('projectId', { type: () => Int, nullable: false }) projectId: number,
        @Args('roleId', { type: () => Int, nullable: false }) roleId: number,
    ) {
        return this.projectsService.addToRole(projectId, roleId);
    }

    @Mutation(() => Project, { name: 'removeProjectFromRole' })
    removeFromRole(
        @Args('projectId', { type: () => Int, nullable: false }) projectId: number,
        @Args('roleId', { type: () => Int, nullable: false }) roleId: number,
    ) {
        return this.projectsService.removeFromRole(projectId, roleId);
    }

    @Mutation(() => Project, { name: 'addDeveloperToProject' })
    addToDeveloper(
        @Args('projectId', { type: () => Int, nullable: false }) projectId: number,
        @Args('developerId', { type: () => Int, nullable: false }) developerId: number,
    ) {
        return this.projectsService.addToDeveloper(projectId, developerId);
    }

    @Mutation(() => Project, { name: 'removeProjectFromDeveloper' })
    removeFromDeveloper(
        @Args('projectId', { type: () => Int, nullable: false }) projectId: number,
        @Args('developerId', { type: () => Int, nullable: false }) developerId: number,
    ) {
        return this.projectsService.removeFromDeveloper(projectId, developerId);
    }
    

}
