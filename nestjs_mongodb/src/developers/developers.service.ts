import { ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Developer } from 'src/schemas/developers.schema';
import { CreateDeveloperDto } from './dtos/create-developer.dto';
import { UpdateDeveloperDto } from './dtos/update-developer.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/schemas/roles.schema';
import { Project } from 'src/schemas/projects.schema';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class DevelopersService {
    constructor(
        @InjectModel(Developer.name)
        private developerModel: Model<Developer>,
        @InjectModel(Project.name)
        private projectModel: Model<Project>,
        @Inject(forwardRef(() => RolesService))
        private roleService: RolesService,
        @Inject(forwardRef(() => ProjectsService))
        private projectsService: ProjectsService
    ){}

    async findAll() {
        return this.developerModel.find();
    }

    async create(createDeveloper:CreateDeveloperDto){
        const newDeveloper = await new this.developerModel(createDeveloper);
        return newDeveloper.save();
    }

    async findOne(id:string){
        return this.developerModel.findById(id);
    }

    async delete(id:string){
        let developerToDelete = await this.findOne(id);
        await this.projectModel.updateMany(
            {}, 
            { $pull: { 
                'developers': developerToDelete, 
                }
            },
            { "multi": true },
        );
        return await this.developerModel.findByIdAndDelete(id);
    }

    async update(id:string, developer:UpdateDeveloperDto) {
        return this.developerModel.findByIdAndUpdate(id, developer, {new:true});
    }

    async addToRole(rolesToAdd: string[], foundDeveloper) {
        const foundRoles = await this.roleService.findRolesByIDs(rolesToAdd);

        if (foundDeveloper && foundRoles) {
  
            return this.developerModel.updateMany(
                {
                    _id: new Types.ObjectId(foundDeveloper._id),
                },
                {
                    $addToSet: {
                        roles: { $each: foundRoles } ,
                    },
                }
            ).exec();
        } else {
            throw new Error(`Founding developer or roles problem`);
        }
    }

    async removeFromRole(id: String, rolesToDelete:string[]){
        let rolesObjects = await this.roleService.findRolesByIDs(rolesToDelete);
        return await this.developerModel.updateOne(
            {_id:id}, 
            { 
                $pull: { 
                    'roles': { 
                        "$in": rolesObjects 
                    } 
                }, 
            }
        );
    }

    async checkRolesInDeveloper(roles:Role[], id:string){
        let developer = await this.developerModel.findOne(
            {   _id:id,
                roles: { $in: roles}
            }
        );
        if(!developer) throw new ForbiddenException("The developer doesn't have the required roles for the projects")
    }

    async addToProject(projectsToAdd: string[], foundDeveloper) {
        const foundProjects = await this.projectsService.findProjectsByIDs(projectsToAdd);
        for (let index = 0; index < foundProjects.length; index++) {
            let projectRoles = foundProjects[index].roles?foundProjects[index].roles:[];
            await this.checkRolesInDeveloper(projectRoles, foundDeveloper._id);
            
        }
        if (foundDeveloper && foundProjects) {
  
            return this.developerModel.updateMany(
                {
                    _id: new Types.ObjectId(foundDeveloper._id),
                },
                {
                    $addToSet: {
                        projects: { $each: foundProjects } ,
                    },
                }
            ).exec();
        } else {
            throw new Error(`Founding developer or projects problem`);
        }
    }

    async findDevelopersByRolesAndProjects(roles:string[]=[], projects:string[]=[]){
        const foundRoles = await this.roleService.findRolesByIDs(roles);
        const foundProjects = await this.projectsService.findProjectsByIDs(projects)
        if (roles.length && !projects.length) {
            return await this.developerModel.find(
                {
                    roles: { 
                        $in: foundRoles 
                    }, 
                }
            )
        }
        if (!roles.length && projects.length) {
            return await this.developerModel.find(
                {
                    projects: { 
                        $in: foundProjects 
                    }, 
                }
            )
        }
        return await this.developerModel.find(
            {
                roles: { 
                    $in: foundRoles 
                }, 
                projects: {
                    $in: foundProjects
                }
            }
        )
    }

}
