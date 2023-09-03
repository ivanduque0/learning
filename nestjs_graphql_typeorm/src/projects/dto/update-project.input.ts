import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateProjectInput } from './create-project.input';
import { StatusProject } from '../entities/project.entity';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {

  @Field(() => Int)
  id: number;

  @MaxLength(256, {
      message: "Project name is too long"
  })
  @IsNotEmpty({
      message: "Name is required"
  })
  @Field({nullable: true})
  name?: string;

  @MaxLength(512, {
      message: "Project description is too long"
  })
  @Field({nullable: true})
  description?: string;

  @Field((type)=> StatusProject, { nullable: true})
  status?: StatusProject;
  }
