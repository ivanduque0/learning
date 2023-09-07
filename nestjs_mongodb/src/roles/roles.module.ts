import { Module, forwardRef } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/schemas/roles.schema';
import { DevelopersModule } from 'src/developers/developers.module';
import { Developer, DeveloperSchema } from 'src/schemas/developers.schema';
import { Project, ProjectSchema } from 'src/schemas/projects.schema';

@Module({
  imports: [
    forwardRef(() => DevelopersModule),
    MongooseModule.forFeature([
      { name:Role.name,
        schema:RoleSchema
      }
    ]),
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
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
