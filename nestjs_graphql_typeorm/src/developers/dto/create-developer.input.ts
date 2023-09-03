import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateDeveloperInput {

  @MaxLength(256, {
    message: "Project name is too long"
  })
  @IsNotEmpty({
      message: "Name is required"
  })
  @Field()
  name: string;

  @IsNotEmpty({
      message: "Email is required"
  })
  @IsEmail()
  @Field()
  email: string;

}
