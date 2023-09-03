import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { RolesModule } from 'src/roles/roles.module';
import { DevelopersModule } from 'src/developers/developers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]), 
    RolesModule, 
    DevelopersModule
  ],
  providers: [ProjectsService, ProjectsResolver],
  exports: [ProjectsService]
})
export class ProjectsModule {}
