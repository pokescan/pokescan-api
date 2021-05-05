import { Generation } from '@generation/schema/generation.schema';
import { Location } from '@location/schema/location.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RegionDocument = Region & Document;

@Schema({ timestamps: true, versionKey: false })
export class Region {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({
    required: true,
    type: [Types.ObjectId],
    ref: Location.name,
    autopopulate: true
  })
  locations: Location[];

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Generation.name,
    autopopulate: true
  })
  generation: Generation;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
