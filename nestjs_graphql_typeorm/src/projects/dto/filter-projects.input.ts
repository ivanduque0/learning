import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Role } from 'src/roles/entities/role.entity';
import { StatusProject } from '../entities/project.entity';

@InputType()
export class FilterProjectsInput {

  @Field((type)=> [StatusProject], { nullable: true})
  statuses?: StatusProject[];

  @Field((type)=> [Int], {nullable: true})
  rolesIds?: number[];
  

}
