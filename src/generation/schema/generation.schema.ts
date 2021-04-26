import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenerationDocument = Generation & Document;

@Schema({ timestamps: true, versionKey: false })
export class Generation {
  @Prop({ required: true, unique: true })
  order: number;
}
export const GenerationSchema = SchemaFactory.createForClass(Generation);
