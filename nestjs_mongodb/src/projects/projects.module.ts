import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/projects.schema';
import { Developer, DeveloperSchema } from 'src/schemas/developers.schema';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name:Project.name,
        schema:ProjectSchema
      }
    ]),
    MongooseModule.forFeature([
      { name:Developer.name,
        schema:DeveloperSchema
      }
    ]),
    RolesModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService]
})
export class ProjectsModule {}
