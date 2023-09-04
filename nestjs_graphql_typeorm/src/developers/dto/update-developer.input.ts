import { IsEmail, IsNotEmpty, MaxLength, MinLength, NotContains } from 'class-validator';
import { CreateDeveloperInput } from './create-developer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';

@InputType()
export class UpdateDeveloperInput extends PartialType(CreateDeveloperInput) {
  @Field(() => Int)
  id: number;

  // @NotContains("  ",{
  //   message: "double empty spaces in name field are not allowed"
  // })
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
  @Field({nullable: true})
  name?: string;

  @IsNotEmpty({
    message: "Email is required"
  })
  @IsEmail()
  @NotContains(" ",{
    message: "empty spaces in email field are not allowed"
  })
  @Field({nullable: true})
  email?: string;

}
