import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AbilityDocument = Ability & Document;

@Schema({ timestamps: true, versionKey: false })
export class Ability {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  description: string;
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
