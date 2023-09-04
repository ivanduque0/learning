import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { GraphQLError } from 'graphql';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private  rolesRepository: Repository<Role>
  ){}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    let roleWithSameName = await this.findOneByName(createRoleInput.name)
    if (roleWithSameName) {
      throw new GraphQLError(`There already exists a role with this name`);
    }

    let role = this.rolesRepository.create(createRoleInput);
    return this.rolesRepository.save(role)
  }

  findAll(): Promise<Role[]>{
    return this.rolesRepository.find()
  }

  findOneById(id: number): Promise<Role> {
    return this.rolesRepository.findOne({
      where: {
        id
      }
    })
  }

  findOneByName(name: string): Promise<Role> {
    return this.rolesRepository.findOne({
      where: {
        name: name
      },
    })
  }

  findRolesByIds(Ids: number[]){
    if (!Ids) {
      return []
    }
    return this.rolesRepository.find(
      {
        where: {
          id: In(Ids)
        }
      }
    )
  }

  async update(updateRoleInput: UpdateRoleInput) {
      let role = await this.findOneById(updateRoleInput.id)
      if (!role) {
        throw new GraphQLError(`The rol doesn't exists`);
      }
      if (updateRoleInput.name) {
        let roleWithSameEmail = await this.findOneByName(updateRoleInput.name)
        if (roleWithSameEmail) {
          if (roleWithSameEmail.id==updateRoleInput.id) {
            throw new GraphQLError(`The rol name has not received any change`);
          }
          throw new GraphQLError(`There already exists a role with this name`);
        }
      }
      
      await this.rolesRepository.update({id:updateRoleInput.id}, updateRoleInput);
      role = await this.findOneById(updateRoleInput.id)
      return role
  }

  async remove(id: number) {
      let role = await this.findOneById(id);
      if(!role){
        throw new GraphQLError(`This role doesn't exists`);
      }
      await this.rolesRepository.delete({id})
      return role
  }

}
