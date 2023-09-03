import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { DevelopersModule } from 'src/developers/developers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), 
    //ProjectsModule, 
    //DevelopersModule
  ],
  providers: [RolesResolver, RolesService],
  exports: [RolesService]
})
export class RolesModule {}
