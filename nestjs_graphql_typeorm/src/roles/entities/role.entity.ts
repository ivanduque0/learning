import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Developer } from 'src/developers/entities/developer.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("roles")
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field((type)=>Int)
  id: number;
  
  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Project, (project) => project.roles, { onDelete:"CASCADE"})
  @Field(() => [Project], { nullable: true })
  projects: Project[];

  @ManyToMany(() => Developer, (developers) => developers.roles, { onDelete:"CASCADE"})
  @Field(() => [Developer], { nullable: true })
  developers: Developer[];


}
