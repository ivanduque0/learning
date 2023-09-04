import { Module, forwardRef } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersResolver } from './developers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { RolesModule } from 'src/roles/roles.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Developer]), 
    RolesModule, 
    forwardRef(() => ProjectsModule)
  ],
  providers: [DevelopersResolver, DevelopersService,],
  exports: [DevelopersService]
})
export class DevelopersModule {}
