import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITranslatableObject } from '@shared/interfaces/translatable-object.interface';
import { Document } from 'mongoose';

export type AbilityDocument = Ability & Document;

@Schema({ timestamps: true, versionKey: false })
export class Ability {
  @Prop({ required: true, trim: true, unique: true })
  name: ITranslatableObject[];

  @Prop({ required: true, trim: true, unique: false })
  description: ITranslatableObject[];
}

export const AbilitySchema = SchemaFactory.createForClass(Ability);
