import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "./roles.schema";
import { Project } from "./projects.schema";
import { Types } from "mongoose";

@Schema({
    timestamps: true
})
export class Developer {
    @Prop({
        required:true,
        trim:true
    })
    name: string;
    
    @Prop({
        required:true,
        trim:true,
        unique:true
    })
    email: string;
    
    @Prop({
        required:false,
        type: Types.ObjectId,
        ref: 'role'
    })
    roles?: Role[]
    // roles?: [
    //     { type: Types.ObjectId, ref: 'role' ,unique:true}
    // ]
    
    @Prop({
        required:false,
        type: Types.ObjectId,
        ref: 'project'
    })
    projects?: Project[];
    
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);