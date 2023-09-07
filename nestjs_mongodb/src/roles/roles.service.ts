import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/schemas/roles.schema';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { DevelopersService } from 'src/developers/developers.service';
import { Developer } from 'src/schemas/developers.schema';
import { Project } from 'src/schemas/projects.schema';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel: Model<Role>,
        @InjectModel(Developer.name)
        private developerModel: Model<Developer>,
        @InjectModel(Project.name)
        private projectModel: Model<Project>
        
    ){}

    async findAll() {
        return this.roleModel.find();
    }

    async findRolesByIDs(rolesIds:string[]) {
        return this.roleModel.find(
            {
                '_id': { $in: rolesIds}
            }
        );
    }

    async create(createRole:CreateRoleDto){
        const newRole = await new this.roleModel(createRole);
        return newRole.save();
    }

    async findOne(id:string){
        return this.roleModel.findById(id);
        
    }

    async delete(id:string){
        let roleToDelete = await this.findOne(id);
        await this.developerModel.updateMany(
            {}, 
            { $pull: { 
                'roles': roleToDelete, 
                }
            },
            { "multi": true },
        );
        await this.projectModel.updateMany(
            {}, 
            { $pull: { 
                'roles': roleToDelete, 
                }
            },
            { "multi": true },
        );
         
        return await this.roleModel.findByIdAndDelete(id);
    }

    async deleteRolesById(rolesIds:string[]){
        let rolesToDelete = await this.findRolesByIDs(rolesIds);
        await this.developerModel.updateMany(
            {}, 
            { $pull: { 
                'roles': { 
                    "$in": rolesToDelete 
                }, 
                }
            },
            { "multi": true },
        );
        await this.projectModel.updateMany(
            {}, 
            { $pull: { 
                'roles': { 
                    "$in": rolesToDelete 
                }, 
                }
            },
            { "multi": true },
        );
         
        return await this.roleModel.deleteMany(
            {
                _id: { $in: rolesIds}
            }
        );
        // return await this.roleModel.findByIdAndDelete(id);
    }

    async update(id:string, role:UpdateRoleDto) {
        return this.roleModel.findByIdAndUpdate(id, role, {new:true});
    }

}
