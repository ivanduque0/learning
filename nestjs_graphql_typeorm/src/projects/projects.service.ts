import { Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from './project.entity';


@Injectable()
export class ProjectsService {

    findAll(): Project[]{
        return [{
            id: 1,
            name: "Making a BackEnd with NestJs",
            description: "I'm making my first backend with NestJs",
            status: ProjectStatus.IN_PROGRESS
        }]
    }
}
