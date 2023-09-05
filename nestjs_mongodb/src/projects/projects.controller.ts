import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(
        private projectService: ProjectsService
    ){}

    @Get()
    findAll() {
        return "Get all projects"
        return this.projectService.findAll();
    }

    @Get(":id")
    findById() {
        return "Get project"
        return this.projectService.findAll();
    }

    @Post()
    createProject(){
        return "Create Project"
    }

    @Delete(":id")
    deleteProject(){
        return "Delete Project"
    }

    @Put(":id")
    updateProject(){
        return "Update Project"
    }
}
