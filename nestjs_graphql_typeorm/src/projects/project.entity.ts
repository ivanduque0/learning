import { Field, Int, ObjectType } from "@nestjs/graphql"

export enum ProjectStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@ObjectType()
export class Project {
    @Field((type)=>Int)
    id: number;
    
    @Field()
    name: string;
    
    @Field({nullable: true})
    description?: string;
    
    @Field()
    status: ProjectStatus;
}