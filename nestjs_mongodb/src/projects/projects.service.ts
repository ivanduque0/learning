import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schemas/projects.schema';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Developer } from 'src/schemas/developers.schema';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name)
        private projectModel: Model<Project>,
        @InjectModel(Developer.name)
        private developerModel: Model<Developer>
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
}
