import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Role {
    @Prop({
        required:true,
        trim:true,
        unique: true
    })
    name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);