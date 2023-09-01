import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ProjectStatus{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@Entity()
@ObjectType()
export class Project {
    @PrimaryGeneratedColumn()
    @Field((type)=>Int)
    id: number;
    
    @Column()
    @Field()
    name: string;
    
    @Column({nullable: true})
    @Field({nullable: true})
    description?: string;
    
    @Column()
    @Field()
    status: ProjectStatus;
}