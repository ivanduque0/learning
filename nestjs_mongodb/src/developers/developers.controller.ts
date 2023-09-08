import { Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dtos/create-developer.dto';
import { UpdateDeveloperDto } from './dtos/update-developer.dto';
import { SearchDevelopersDto } from './dtos/search-developers.dto';

@Controller('developers')
export class DevelopersController {
    constructor(
        private developerService: DevelopersService
    ){}

    @Get()
    findAll() {
        return this.developerService.findAll();
    }

    @Get(":id")
    async findById(@Param('id') id:string) {
        try {
            const developer = await this.developerService.findOne(id);
            if (!developer) {
                throw new NotFoundException("Developer not found")
            }
            return developer;
        } catch (error) {
            throw new NotFoundException("Developer not found")
        }
    }

    @Post("/addToRole/:id")
    async addToRole(@Param('id') id:string, @Body() body:UpdateDeveloperDto) {
        try {
            const developer = await this.developerService.findOne(id);
            if (!developer) {
                throw new NotFoundException("Developer not found")
            }
            return this.developerService.addToRole(body.roles, developer);
        } catch (error) {
            throw new NotFoundException("Developer not found")
        }
    }

    @Post("/addToProject/:id")
    async addToProject(@Param('id') id:string, @Body() body:UpdateDeveloperDto) {
        try {
            const developer = await this.developerService.findOne(id);
            if (!developer) {
                throw new NotFoundException("Developer not found")
            }
            return this.developerService.addToProject(body.projects, developer);
        } catch (error) {
            throw new NotFoundException("Developer not found")
        }
    }

    @Post("getMany/")
    @HttpCode(200)
    async findProjectsByRolesAndStatus(@Body() body:SearchDevelopersDto) {
        return await this.developerService.findDevelopersByRolesAndProjects(body.roles, body.projects);
    }

    @Delete("/removeFromRole/:id")
    async removeFromRole(@Param('id') id:string, @Body() body:UpdateDeveloperDto) {
        try {
            const developer = await this.developerService.findOne(id);
            if (!developer) {
                throw new NotFoundException("Developer not found")
            }
            return this.developerService.removeFromRole(id, body.roles);
        } catch (error) {
            throw new NotFoundException("Developer not found")
        }
    }

    @Post()
    async createDeveloper(@Body() body:CreateDeveloperDto){
        try {
            return await this.developerService.create(body);
        } catch (error) {
            if (error.code===11000) {
                throw new ConflictException("Email is already being used")
            }
            throw error;
        }
    }

    @Delete(":id")
    @HttpCode(204)
    async deleteDeveloper(@Param('id') id:string){
        try {
            return await this.developerService.delete(id);
        } catch (error) {
            throw new NotFoundException("Developer not found")
        }
        
    }

    @Put(":id")
    async updateDeveloper(@Param('id') id:string, @Body() body:UpdateDeveloperDto){
        try {
            const developer = await this.developerService.update(id, body);
            if (!developer) {
                throw new NotFoundException("Developer not found")
            }
            return developer;
        } catch (error) {
            if (error.code===11000) {
                throw new ConflictException("Email is already being used")
            }
            throw new NotFoundException("Developer not found")
        }
        
    }
}
