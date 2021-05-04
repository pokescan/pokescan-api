import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonMoveDocument = PokemonMove & Document;

@Schema({ timestamps: true, versionKey: false })
export class PokemonMove {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;
}

export const PokemonMoveSchema = SchemaFactory.createForClass(PokemonMove);
