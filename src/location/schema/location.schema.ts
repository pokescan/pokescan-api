import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true, versionKey: false })
export class Location {
  @Prop({ required: true, trim: true, unique: true })
  name: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
