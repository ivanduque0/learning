import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private  rolesRepository: Repository<Role>
  ){}

  create(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = this.rolesRepository.create(createRoleInput);
    return this.rolesRepository.save(role)
  }

  findAll(): Promise<Role[]>{
    return this.rolesRepository.find()
  }

  findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOne({
      where: {
        id
      }
    })
  }

  update(updateProjectInput: UpdateRoleInput) {
      return this.rolesRepository.update({id:updateProjectInput.id}, updateProjectInput);
  }

  remove(id: number) {
      return this.rolesRepository.delete({id})
  }

}
