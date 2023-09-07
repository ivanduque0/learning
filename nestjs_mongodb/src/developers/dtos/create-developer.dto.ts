import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateDeveloperDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}