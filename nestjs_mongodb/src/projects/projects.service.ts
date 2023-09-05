import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schemas/projects.schema';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project.name)
        private projectModel: Model<Project>
    ){}

    findAll() {
        this.projectModel.find();
    }

    async create(createProject:CreateProjectDto){
        const newProject = await new this.projectModel(createProject);
        return newProject.save();
    }

    async findOne(id:string){
        return this.projectModel.findById(id);
    }

    async delete(id:string){
        return this.projectModel.findByIdAndDelete(id);
    }

    async update(id:string, project:UpdateProjectDto) {
        return this.projectModel.findByIdAndUpdate(id, project);
    }
}
