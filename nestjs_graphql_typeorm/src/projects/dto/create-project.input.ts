import { Field, InputType } from "@nestjs/graphql";
import { StatusProject } from "../entities/project.entity";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Role } from "src/roles/entities/role.entity";
import { Developer } from "src/developers/entities/developer.entity";

@InputType()
export class CreateProjectInput {

    @MaxLength(256, {
        message: "Project name is too long"
    })
    @IsNotEmpty({
        message: "Name is required"
    })
    @Field()
    name: string;
    
    @MaxLength(512, {
        message: "Project description is too long"
    })
    @Field({nullable: true})
    description?: string;
    
    @Field({defaultValue:StatusProject.PENDING, nullable: true})
    status?: StatusProject;

    // @Field((type)=>[Role],{defaultValue:[   ], nullable: true})
    // roles?: Role[];

    // @Field((type)=>[Developer], {defaultValue:[], nullable: true})
    // developers?: Developer[];
}