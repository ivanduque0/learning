import { Query, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Resolver()
export class ProjectsResolver {

    constructor(private projectsService: ProjectsService) {}

    @Query(()=> [Project])
    projects() {
        return this.projectsService.findAll(); 
    }

}
