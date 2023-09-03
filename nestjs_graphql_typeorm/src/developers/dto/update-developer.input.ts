import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateDeveloperInput } from './create-developer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDeveloperInput extends PartialType(CreateDeveloperInput) {
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

  @IsEmail()
  @Field({nullable: true})
  email?: string;

}
