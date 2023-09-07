import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "./roles.schema";
import { Developer } from "./developers.schema";
import { Types } from "mongoose";

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
        trim:true,
        unique: true
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

    @Prop({
        required:false,
        type: Types.ObjectId,
        ref: 'role'
    })
    roles?: Role[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);