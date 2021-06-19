import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EggGroupDocument = EggGroup & Document;

@Schema({ timestamps: true, versionKey: false })
export class EggGroup {
  @Prop({ required: true, trim: true, unique: true })
  name: string;
}

export const EggGroupSchema = SchemaFactory.createForClass(EggGroup);
