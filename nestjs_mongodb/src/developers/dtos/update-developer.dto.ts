import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDeveloperDto {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsArray ()
    @IsOptional()
    @IsNotEmpty()
    projects?: string[] = [];

    @IsArray ()
    @IsOptional()
    @IsNotEmpty()
    roles?: string[] = [];
}