import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Developer } from "src/developers/entities/developer.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum StatusProject{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN PROGRESS',
    FINISHED = 'FINISHED'
}
registerEnumType(StatusProject, {
name: 'StatusProject',
});

@Entity("projects")
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
    
    @Column({type: 'enum', enum: StatusProject, nullable: true})
    @Field({ nullable: true})
    status: StatusProject;

    @ManyToMany((type) => Role, (role) => role.projects, )
    // @ManyToMany(() => Role, (role) => role.projects, { cascade: true })
    @Field((type) => [Role], { nullable: true })
    @JoinTable({
        name: 'projects_roles', // table name for the junction table of this relation
        // joinColumn: {
        // name: 'country_id',
        // referencedColumnName: 'id',
        // },
        // inverseJoinColumn: {
        // name: 'treaty_id',
        // referencedColumnName: 'id',
        // },
    })
    roles: Role[];

    @ManyToMany((type) => Developer, (developer) => developer.projects)
    @Field((type)=>[Developer], {nullable:true})
    @JoinTable({
        name: 'projects_developers',
    })
    developers: Developer[]

    

    // @JoinTable()
    // @ManyToMany((type) => Developer, (developer) => developer.projects)
    // @Field((type)=>[Developer])
    // developers: Developer[]

    
    // @ManyToMany(() => Role,(role) => role.projects)
    // @Field((type)=>[Role], {nullable:true})
    // @JoinTable({
    // })
    // roles: Role[]

    
   
}