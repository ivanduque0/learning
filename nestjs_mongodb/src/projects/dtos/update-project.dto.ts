import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusProject } from "src/schemas/projects.schema";

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(StatusProject)
    @IsOptional()
    status?:StatusProject
}