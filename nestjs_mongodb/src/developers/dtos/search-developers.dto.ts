import { IsArray, IsOptional } from "class-validator";

export class SearchDevelopersDto {

    @IsArray()
    @IsOptional()
    roles?:string[]=[];
    
    @IsArray()
    @IsOptional()
    projects?:string[]=[];

}