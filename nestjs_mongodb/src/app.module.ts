import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { RolesModule } from './roles/roles.module';
import { DevelopersModule } from './developers/developers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    
    //MongooseModule.forRoot('mongodb://test:test@mongo:27017'),
    // MongooseModule.forRoot('mongodb://test:test@localhost:27017'),
    MongooseModule.forRoot('mongodb://test:test@mongodb:27017',
    ),
    // MongooseModule.forRoot('mongodb://root:pass12345@localhost', {
    //   //dbName: process.env.DATABASE_NAME,
    //   auth: {
    //     username: process.env.MONGO_INITDB_ROOT_USERNAME,
    //     password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    //   },
    // }),
    ProjectsModule, 
    RolesModule, 
    DevelopersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
