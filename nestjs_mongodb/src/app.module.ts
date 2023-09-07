import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './roles/roles.module';
import { DevelopersModule } from './developers/developers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`,
    {
      dbName: process.env.MONGO_INITDB_DATABASE,
      // auth: {
      //   username: process.env.MONGO_INITDB_ROOT_USERNAME,
      //   password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      // },
    }
    ),
    ProjectsModule, 
    RolesModule, 
    DevelopersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
