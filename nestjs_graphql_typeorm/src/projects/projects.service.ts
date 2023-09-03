import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { Role } from 'src/roles/entities/role.entity';
import { Developer } from 'src/developers/entities/developer.entity';
import { DevelopersService } from 'src/developers/developers.service';
import { RolesService } from 'src/roles/roles.service';
import { UpdateProjectInput } from './dto/update-project.input';


@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        // @InjectRepository(Role)
        // private rolesRepository: Repository<Role>,
        private rolesRepository: RolesService,
        private developersRepository: DevelopersService
    ){

    }

    async findAll(): Promise<Project[]>{
        return this.projectsRepository.find({ relations: ['roles', 'developers'] });
    }

    findOne(id: number): Promise<Project>{
        return this.projectsRepository.findOne({
            where: {
                id,
            }, 
            relations: ['roles', 'developers'] 
        })
    } 

    update(updateProjectInput: UpdateProjectInput) {
        return this.projectsRepository.update({id:updateProjectInput.id}, updateProjectInput);
    }
    
    remove(id: number) {
        return this.projectsRepository.delete({id})
    }

    async createProject(project: CreateProjectInput): Promise<Project>{
        const newProject = await this.projectsRepository.create(project)
        return await this.projectsRepository.save(newProject)
    }

    async addToRole(projectId: number, roleId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundRole = await this.rolesRepository.findOne(roleId);
        if (foundProject && foundRole) {
            // foundProject.roles = foundProject.roles
            // ? foundProject.roles.concat(foundRole)
            // : [foundRole];
            foundProject.roles = foundProject.roles
            ? [...foundProject.roles, foundRole]
            : [foundRole];

            return this.projectsRepository.save(foundProject);
        } else {
            throw new Error(`Founding project or role problem`);
        }
    }

    async removeFromRole(projectId: number,roleId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundRole = await this.rolesRepository.findOne(roleId);
    
        if (foundProject && foundRole) {
            foundProject.roles = foundProject.roles
            ? [...foundProject.roles.filter((f) => f.id != roleId)]
            : [];
    
          return this.projectsRepository.save(foundProject);
        } else {
          throw new Error(`Founding project or role problem`);
        }
    }

    async addToDeveloper(projectId: number, developerId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundDeveloper = await this.developersRepository.findOne(developerId);
        if (foundProject && foundDeveloper) {
            foundProject.developers = foundProject.developers
            ? [...foundProject.developers, foundDeveloper]
            : [foundDeveloper];

            return this.projectsRepository.save(foundProject);
        } else {
            throw new Error(`Founding project or role problem`);
        }
    }

    async removeFromDeveloper(projectId: number,developerId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundDeveloper = await this.developersRepository.findOne(developerId);
    
        if (foundProject && foundDeveloper) {
            foundProject.developers = foundProject.developers
            ? [...foundProject.developers.filter((f) => f.id != developerId)]
            : [];
    
          return this.projectsRepository.save(foundProject);
        } else {
          throw new Error(`Founding project or role problem`);
        }
    }
}
