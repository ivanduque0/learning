import { Module, forwardRef } from '@nestjs/common';
import { DevelopersController } from './developers.controller';
import { DevelopersService } from './developers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from 'src/schemas/developers.schema';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { Project, ProjectSchema } from 'src/schemas/projects.schema';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name:Developer.name,
        schema:DeveloperSchema
      }
    ]),
    MongooseModule.forFeature([
      { name:Project.name,
        schema:ProjectSchema
      }
    ]),
    forwardRef(() => RolesModule),
    forwardRef(() => ProjectsModule)
  ],
  controllers: [DevelopersController],
  providers: [DevelopersService],
  exports:[DevelopersService]
})
export class DevelopersModule {}
