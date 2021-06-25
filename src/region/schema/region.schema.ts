import { Generation } from '@generation/schema/generation.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITranslatableObject } from '@shared/interfaces/translatable-object.interface';
import { Document, Types } from 'mongoose';

export type RegionDocument = Region & Document;

@Schema({ timestamps: true, versionKey: false })
export class Region {
  @Prop({ required: true, trim: true, unique: true })
  name: ITranslatableObject[];

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Generation.name,
    autopopulate: true
  })
  generation: Generation;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
