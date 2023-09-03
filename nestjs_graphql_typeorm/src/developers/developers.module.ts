import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersResolver } from './developers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Developer]), RolesModule],
  providers: [DevelopersResolver, DevelopersService,],
  exports: [DevelopersService]
})
export class DevelopersModule {}
