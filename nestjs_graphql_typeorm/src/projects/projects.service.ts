import { Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project) private projectRepository: Repository<Project>
    ){

    }

    findAll(): Promise<Project[]>{
        return this.projectRepository.find();
    }
}
