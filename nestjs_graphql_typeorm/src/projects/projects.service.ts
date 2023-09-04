import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import { DevelopersService } from 'src/developers/developers.service';
import { RolesService } from 'src/roles/roles.service';
import { UpdateProjectInput } from './dto/update-project.input';
import { FilterProjectsInput } from './dto/filter-projects.input';
import { GraphQLError } from 'graphql';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
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

    findProjectsByIds(Ids: number[]){
        if (!Ids) {
          return []
        }
        return this.projectsRepository.find(
          {
            where: {
              id: In(Ids)
            }
          }
        )
      }

    async findByRolesAndStatuses(filterProjectInput:FilterProjectsInput): Promise <Project[]>{
        let roles = await this.rolesRepository.findRolesByIds(filterProjectInput.rolesIds)
        let statuses = filterProjectInput.statuses ? filterProjectInput.statuses : []
        if (statuses.length) {
            return this.projectsRepository.find({
                where: {
                    roles:roles,
                    status:In(filterProjectInput.statuses)
                }, relations: ['roles', 'developers']
                //,  loadRelationIds: true
            })
        } else {
            return this.projectsRepository.find({
                where: {
                    roles:roles,
                }, relations: ['roles', 'developers']
            })
        }
        
        
    }

    async update(updateProjectInput: UpdateProjectInput) {
        let project = await this.findOne(updateProjectInput.id);
        if (!project) {
            throw new GraphQLError(`The project doesn't exists`);
        }
        await this.projectsRepository.update({id:updateProjectInput.id}, updateProjectInput);
        project = await this.findOne(updateProjectInput.id);
        return project
    }
    
    async remove(id: number) {
        let project = await this.findOne(id);
        if(!project){
            throw new GraphQLError(`The project doesn't exists`);
        }
        await this.projectsRepository.delete({id})
        return project
    }

    async createProject(project: CreateProjectInput): Promise<Project>{
        const newProject = await this.projectsRepository.create(project)
        return await this.projectsRepository.save(newProject)
    }

    async addToRole(projectId: number, roleId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundRole = await this.rolesRepository.findOneById(roleId);
        if (foundProject && foundRole) {
            // foundProject.roles = foundProject.roles
            // ? foundProject.roles.concat(foundRole)
            // : [foundRole];
            foundProject.roles = foundProject.roles
            ? [...foundProject.roles, foundRole]
            : [foundRole];

            return this.projectsRepository.save(foundProject);
        } else {
            throw new GraphQLError(`Founding project or role problem`);
        }
    }

    async removeFromRole(projectId: number,roleId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundRole = await this.rolesRepository.findOneById(roleId);
    
        if (foundProject && foundRole) {
            foundProject.roles = foundProject.roles
            ? [...foundProject.roles.filter((f) => f.id != roleId)]
            : [];
    
          return this.projectsRepository.save(foundProject);
        } else {
          throw new GraphQLError(`Founding project or role problem`);
        }
    }

    async addToDeveloper(projectId: number, developerId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundDeveloper = await this.developersRepository.findOneById(developerId);
        if (!foundProject && !foundDeveloper) {
            throw new GraphQLError(`Founding project or role problem`);
        }
        let rolesInCommon = foundProject.roles.filter(projectRoles => foundDeveloper.roles.some((developerRole) => projectRoles.id === developerRole.id));
        if (!rolesInCommon.length) {
            throw new GraphQLError(`The developer doesn't have a required role to join this project`);
        }
        
        foundProject.developers = foundProject.developers
        ? [...foundProject.developers, foundDeveloper]
        : [foundDeveloper];

        return this.projectsRepository.save(foundProject);
    }

    async removeFromDeveloper(projectId: number,developerId: number): Promise<Project> {
        let foundProject = await this.findOne(projectId);
        let foundDeveloper = await this.developersRepository.findOneById(developerId);
    
        if (foundProject && foundDeveloper) {
            throw new GraphQLError(`Founding project or role problem`);
        }

        foundProject.developers = foundProject.developers
        ? [...foundProject.developers.filter((f) => f.id != developerId)]
        : [];
    
        return this.projectsRepository.save(foundProject);
    }
}
