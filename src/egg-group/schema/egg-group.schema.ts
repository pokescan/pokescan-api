import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TranslatableObject } from '@shared/models/translatable';
import { Document } from 'mongoose';

export type EggGroupDocument = EggGroup & Document;

@Schema({ timestamps: true, versionKey: false })
export class EggGroup {
  @Prop({ required: true, trim: true, unique: true })
  name: TranslatableObject[];
}

export const EggGroupSchema = SchemaFactory.createForClass(EggGroup);
