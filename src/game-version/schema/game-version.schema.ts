import { Generation } from '@generation/schema/generation.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GameVersionDocument = GameVersion & Document;

@Schema({ timestamps: true, versionKey: false })
export class GameVersion {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: true, trim: true, unique: false })
  imageUrl: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: Generation.name,
    autopopulate: true
  })
  generation: Generation;
}

export const GameVersionSchema = SchemaFactory.createForClass(GameVersion);
