import { Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(
        private projectService: ProjectsService
    ){}

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Get(":id")
    async findById(@Param('id') id:string) {
        try {
            const project = await this.projectService.findOne(id);
            if (!project) {
                throw new NotFoundException("Project not found")
            }
            return project;
        } catch (error) {
            throw new NotFoundException("Project not found")
        }
    }

    @Post()
    async createProject(@Body() body:CreateProjectDto){
        try {
            return await this.projectService.create(body);
        } catch (error) {
            if (error.code===11000) {
                throw new ConflictException("Project name is already being used")
            }
            throw error;
        }
    }

    @Delete("deleteOneProject/:id")
    @HttpCode(204)
    async deleteOneProject(@Param('id') id:string){
        try {
            return await this.projectService.delete(id);
        } catch (error) {
            throw new NotFoundException("Project not found")
        }
        
    }

    @Delete("/deleteManyProjects")
    @HttpCode(204)
    async deleteManyProjects(@Body() body:any){
        try {
            return await this.projectService.deleteProjectsById(body.projects);
        } catch (error) {
            throw new NotFoundException("Roles not found")
        }
        
    }

    @Put(":id")
    async updateProject(@Param('id') id:string, @Body() body:UpdateProjectDto){
        try {
            const project = await this.projectService.update(id, body);
            if (!project) {
                throw new NotFoundException("Project not found")
            }
            return project;
        } catch (error) {
            if (error.code===11000) {
                throw new ConflictException("Project name is already being used")
            }
            throw new NotFoundException("Project not found")
        }
        
    }
}
