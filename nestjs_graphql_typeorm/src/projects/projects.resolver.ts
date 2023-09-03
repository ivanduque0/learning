import { Args, Int, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { Role } from "../roles/entities/role.entity";
import { UpdateProjectInput } from './dto/update-project.input';

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

    @Mutation(() => Project)
    createProject(@Args('projectInput') projectInput: CreateProjectInput){
        return this.projectsService.createProject(projectInput)
    }

    @Mutation(() => Project)
    updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput): Promise<Project> {
        this.projectsService.update(updateProjectInput);
        return this.projectsService.findOne(updateProjectInput.id);
    }
  
    @Mutation(() => Project)
    removeProject(@Args('id', { type: () => Int }) id: number) {
      let project = this.projectsService.findOne(id);
      this.projectsService.remove(id);
      return project;
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
