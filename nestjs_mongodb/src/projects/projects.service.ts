import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, StatusProject } from 'src/schemas/projects.schema';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Developer } from 'src/schemas/developers.schema';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name)
        private projectModel: Model<Project>,
        @InjectModel(Developer.name)
        private developerModel: Model<Developer>,
        private roleService: RolesService
    ){}

    async findAll() {
        return this.projectModel.find();
    }

    async findProjectsByIDs(projectsIds:string[]) {
        return await this.projectModel.find(
            {
                '_id': { $in: projectsIds}
            }
        );
    }

    async create(createProject:CreateProjectDto){
        const newProject = await new this.projectModel(createProject);
        return newProject.save();
    }

    async findOne(id:string){
        return this.projectModel.findById(id);
    }

    async addToRole(rolesToAdd: string[], foundProject) {
        const foundRoles = await this.roleService.findRolesByIDs(rolesToAdd);

        if (foundProject && foundRoles) {
  
            return await this.projectModel.updateMany(
                {
                    _id: new Types.ObjectId(foundProject._id),
                },
                {
                    $addToSet: {
                        roles: { $each: foundRoles } ,
                    },
                }
            ).exec();
        } else {
            throw new Error(`Founding project or roles problem`);
        }
    }

    async delete(id:string){
        let projectToDelete = await this.findOne(id);
        await this.developerModel.updateMany(
            {}, 
            { $pull: { 
                'projects': projectToDelete, 
                }
            },
            { "multi": true },
        );
        return await this.projectModel.findByIdAndDelete(id);
    }

    async deleteProjectsById(projectsIds:string[]){
        let projectsToDelete = await this.findProjectsByIDs(projectsIds);
        await this.developerModel.updateMany(
            {}, 
            { $pull: { 
                'projects': { 
                    "$in": projectsToDelete 
                }, 
                }
            },
            { "multi": true },
        );
         
        return await this.projectModel.deleteMany(
            {
                _id: { $in: projectsIds}
            }
        );
    }

    async update(id:string, project:UpdateProjectDto) {
        return this.projectModel.findByIdAndUpdate(id, project, {new:true});
    }

    async findProjectsByRolesAndStatus(roles:string[]=[], statuses:StatusProject[]=[]){
        const foundRoles = await this.roleService.findRolesByIDs(roles);
        if (roles.length && !statuses.length) {
            return await this.projectModel.find(
                {
                    roles: { 
                        $in: foundRoles 
                    }, 
                }
            )
        }
        if (!roles.length && statuses.length) {
            return await this.projectModel.find(
                {
                    status: { 
                        $in: statuses 
                    }, 
                }
            )
        }
        return await this.projectModel.find(
            {
                roles: { 
                    $in: foundRoles 
                }, 
                status: {
                    $in: statuses
                }
            }
        )
    }
}
