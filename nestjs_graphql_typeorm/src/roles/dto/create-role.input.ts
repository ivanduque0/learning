import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @MaxLength(256, {
    message: "Role name is too long"
  })
  @IsNotEmpty({
      message: "Name is required"
  })
  @Field()
  name: string;

}
