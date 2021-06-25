import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Region } from '@region/schema/region.schema';
import { TranslatableObject } from '@shared/models/translatable';
import { Document, Types } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true, versionKey: false })
export class Location {
  @Prop({ required: true, trim: true, unique: true })
  name: TranslatableObject[];

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Region.name,
    autopopulate: true
  })
  region: Region;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
