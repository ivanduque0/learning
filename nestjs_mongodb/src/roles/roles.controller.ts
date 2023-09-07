import { Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private roleService: RolesService
    ){}

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Get(":id")
    async findById(@Param('id') id:string) {
        try {
            const role = await this.roleService.findOne(id);
            if (!role) {
                throw new NotFoundException("Role not found")
            }
            return role;
        } catch (error) {
            throw new NotFoundException("Role not found")
        }
    }

    @Post()
    async createRole(@Body() body:CreateRoleDto){
        try {
            return await this.roleService.create(body);
        } catch (error) {
            if (error.code===11000) {
                throw new ConflictException("Role already exists")
            }
            throw error;
        }
    }

    @Delete("/deleteOneRole/:id")
    @HttpCode(204)
    async deleteOneRole(@Param('id') id:string){
        try {
            return await this.roleService.delete(id);
        } catch (error) {
            throw new NotFoundException("Role not found")
        }
        
    }

    @Delete("/deleteManyRoles")
    @HttpCode(204)
    async deleteManyRoles(@Body() body:any){
        try {
            return await this.roleService.deleteRolesById(body.roles);
        } catch (error) {
            throw new NotFoundException("Roles not found")
        }
        
    }

    @Put(":id")
    async updateRole(@Param('id') id:string, @Body() body:UpdateRoleDto){
        try {
            const role = await this.roleService.update(id, body);
            if (!role) {
                throw new NotFoundException("Role not found")
            }
            return role;
        } catch (error) {
            if (error.code===11000) {
                throw new ConflictException("Role already exists")
            }
            throw new NotFoundException("Role not found")
        }
        
    }
}
