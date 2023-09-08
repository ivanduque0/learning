import { IsArray, IsOptional } from "class-validator";
import { StatusProject } from "src/schemas/projects.schema";

export class SearchProjectsDto {

    @IsArray()
    @IsOptional()
    roles?:string[]=[];
    
    @IsArray()
    @IsOptional()
    statuses?:StatusProject[]=[];

}