import { Injectable } from '@nestjs/common';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { UpdateDeveloperInput } from './dto/update-developer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class DevelopersService {
 
  constructor(
    @InjectRepository(Developer) 
    private developersRepository: Repository<Developer>,
    private rolesRepository: RolesService,
  ){}

  create(createDeveloperInput: CreateDeveloperInput): Promise<Developer> {
    const developer = this.developersRepository.create(createDeveloperInput);
    return this.developersRepository.save(developer)
  }

  findAll(): Promise<Developer[]>{
    return this.developersRepository.find({ relations: ['roles', 'projects'] })
  }

  findOne(id: number): Promise<Developer> {
    return this.developersRepository.findOne({
      where: {
        id
      },
      relations: ['roles', 'projects'] 
    })
  }

  update(updateDeveloperInput: UpdateDeveloperInput) {
    return this.developersRepository.update({id:updateDeveloperInput.id}, updateDeveloperInput);
  }

  remove(id: number) {
    return this.developersRepository.delete({id})
  }

  async addToRole(developerId: number, roleId: number): Promise<Developer> {
      let foundDeveloper = await this.findOne(developerId);
      let foundRole = await this.rolesRepository.findOne(roleId);
      if (foundDeveloper && foundRole) {
          // foundDeveloper.roles = foundDeveloper.roles
          // ? foundDeveloper.roles.concat(foundRole)
          // : [foundRole];
          foundDeveloper.roles = foundDeveloper.roles
          ? [...foundDeveloper.roles, foundRole]
          : [foundRole];

          return this.developersRepository.save(foundDeveloper);
      } else {
          throw new Error(`Founding project or role problem`);
      }
  }

  async removeFromRole(developerId: number,roleId: number): Promise<Developer> {
      let foundDeveloper = await this.findOne(developerId);
      let foundRole = await this.rolesRepository.findOne(roleId);

      if (foundDeveloper && foundRole) {
          foundDeveloper.roles = foundDeveloper.roles
          ? [...foundDeveloper.roles.filter((f) => f.id != roleId)]
          : [];

        return this.developersRepository.save(foundDeveloper);
      } else {
        throw new Error(`Founding project or role problem`);
      }
  }
}
