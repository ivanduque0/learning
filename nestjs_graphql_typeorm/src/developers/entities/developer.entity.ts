import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Project } from 'src/projects/entities/project.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("developers")
@ObjectType()
export class Developer {

  @PrimaryGeneratedColumn()
  @Field((type)=>Int)
  id: number;
  
  @Column()
  @Field()
  name: string;
  
  @Column()
  @Field()
  email: string;

  @ManyToMany(() => Project, (project) => project.developers, { onDelete:"CASCADE"})
  @Field(() => [Project], { nullable: true })
  projects: Project[];

  @ManyToMany(() => Role, (role) => role.developers, { onDelete:"CASCADE"})
  @Field(() => [Role], { nullable: true })
  @JoinTable({
    name: 'developers_roles',
  })
  roles: Role[];
}
