import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { UpdateDeveloperInput } from './dto/update-developer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { ProjectsService } from 'src/projects/projects.service';
import { GraphQLError } from 'graphql';
import { FilterDevelopersInput } from './dto/filter-developers.input';

@Injectable()
export class DevelopersService {
 
  constructor(
    @InjectRepository(Developer) 
    private developersRepository: Repository<Developer>,
    private rolesRepository: RolesService,
    @Inject(forwardRef(() => ProjectsService))
    private projectsRepository: ProjectsService,
  ){}

  async create(createDeveloperInput: CreateDeveloperInput): Promise<Developer> {
    let developerWithSameEmail = await this.findOneByEmail(createDeveloperInput.email)
    if (developerWithSameEmail) {
      throw new GraphQLError(`The email is being used by someone else`);
    }

    let developer = this.developersRepository.create(createDeveloperInput);
    return this.developersRepository.save(developer)
  }

  findAll(): Promise<Developer[]>{
    return this.developersRepository.find({ relations: ['roles', 'projects'] })
  }

  findOneById(id: number): Promise<Developer> {
    return this.developersRepository.findOne({
      where: {
        id
      },
      relations: ['roles', 'projects'] 
    })
  }

  findOneByEmail(email: string): Promise<Developer> {
    return this.developersRepository.findOne({
      where: {
        email: email
      },
      relations: ['roles', 'projects'] 
    })
  }

  async findByRolesAndProjects(filterProjectInput:FilterDevelopersInput): Promise <Developer[]>{

      let roles = await this.rolesRepository.findRolesByIds(filterProjectInput.rolesIds)
      let projects = await this.projectsRepository.findProjectsByIds(filterProjectInput.projectsIds)
      if (roles.length && projects.length) {
          return this.developersRepository.find({
              where: {
                  roles:roles,
                  projects:projects
              }, relations: ['roles', 'projects']
          })
      } else if (roles.length && !projects.length){
          return this.developersRepository.find({
              where: {
                  roles:roles,
              }, relations: ['roles', 'projects']
          })
      } else if (!roles.length && projects.length){
          return this.developersRepository.find({
              where: {
                  projects:projects
              }, relations: ['roles', 'projects']
          })
      } 
      return []
  }

  async update(updateDeveloperInput: UpdateDeveloperInput) {
    let developer = await this.findOneById(updateDeveloperInput.id)
    if (!developer) {
      throw new GraphQLError(`The developer doesn't exists`);
    }
    if (updateDeveloperInput.email) {
      let developerWithSameEmail = await this.findOneByEmail(updateDeveloperInput.email)
      if (developerWithSameEmail) {
        if (developerWithSameEmail.id==updateDeveloperInput.id) {
          throw new GraphQLError(`The email has not received any changes`);
        }
        // throw new GraphQLError(`The email is being used by someone else`, {

        //   extensions: {
        
        //     code: 'FORBIDDEN',
        //   },
        // });
        // throw new GraphQLError(`The email is being used by someone else`);
        throw new GraphQLError(`The email is being used by someone else`);
      }
    }

    await this.developersRepository.update({id:updateDeveloperInput.id}, updateDeveloperInput);
    developer = await this.findOneById(updateDeveloperInput.id)
    return developer
  }

  async remove(id: number) {
    let developer = this.findOneById(id);
    if (!developer) {
      throw new GraphQLError(`The developer doesn't exists`);
    }
    await this.developersRepository.delete({id})
    return developer
  }

  async addToRole(developerId: number, roleId: number): Promise<Developer> {
      let foundDeveloper = await this.findOneById(developerId);
      let foundRole = await this.rolesRepository.findOneById(roleId);
      if (foundDeveloper && foundRole) {
          // foundDeveloper.roles = foundDeveloper.roles
          // ? foundDeveloper.roles.concat(foundRole)
          // : [foundRole];
          foundDeveloper.roles = foundDeveloper.roles
          ? [...foundDeveloper.roles, foundRole]
          : [foundRole];

          return this.developersRepository.save(foundDeveloper);
      } else {
          throw new GraphQLError(`Founding project or role problem`);
      }
  }

  async removeFromRole(developerId: number,roleId: number): Promise<Developer> {
      let foundDeveloper = await this.findOneById(developerId);
      let foundRole = await this.rolesRepository.findOneById(roleId);

      if (foundDeveloper && foundRole) {
          foundDeveloper.roles = foundDeveloper.roles
          ? [...foundDeveloper.roles.filter((f) => f.id != roleId)]
          : [];

        return this.developersRepository.save(foundDeveloper);
      } else {
        throw new GraphQLError(`Founding project or role problem`);
      }
  }
}
