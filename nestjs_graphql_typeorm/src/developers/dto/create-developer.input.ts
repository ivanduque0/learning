import { InputType, Int, Field } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength, NotContains } from 'class-validator';

@InputType()
export class CreateDeveloperInput {

  @Transform(({ value }: TransformFnParams) => value.trim())
  @MaxLength(256, {
    message: "Developer name is too long"
  })
  @MinLength(3, {
    message: "Developer name is too short"
  })
  @IsNotEmpty({
      message: "Developer name is required"
  })
  @Field()
  name: string;

  @IsNotEmpty({
      message: "Email is required"
  })
  @IsEmail()
  @NotContains(" ",{
    message: "empty spaces in email field are not allowed"
  })
  @Field()
  email: string;

}
