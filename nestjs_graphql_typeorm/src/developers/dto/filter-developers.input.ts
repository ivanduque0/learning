import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FilterDevelopersInput {

  @Field((type)=> [Int], {nullable: true})
  projectsIds?: number[];

  @Field((type)=> [Int], {nullable: true})
  rolesIds?: number[];
  

}
