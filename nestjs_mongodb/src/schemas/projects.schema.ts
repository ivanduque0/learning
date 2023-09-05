import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum StatusProject{
    IN_PROGRESS = 'IN PROGRESS',
    PENDING = 'PENDING',
    PAUSED = 'PAUSED',
    FINISHED = 'FINISHED'
}

@Schema({
    timestamps: true
})
export class Project {
    @Prop({
        required:true,
        trim:true
    })
    name: string;
    
    @Prop({
        required:false,
        trim:true
    })
    description?: string;
    
    @Prop({
        enum:StatusProject,
        required:true,
        trim:true,
        default:StatusProject.IN_PROGRESS
    })
    status: StatusProject;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);