import { IsNotEmpty, MaxLength } from 'class-validator';
import { CreateRoleInput } from './create-role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int)
  id: number;

  @MaxLength(256, {
    message: "Role name is too long"
  })
  @IsNotEmpty({
      message: "Name is required"
  })
  @Field({nullable: true})
  name?: string;



}
