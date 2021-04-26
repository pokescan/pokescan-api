import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonTypeDocument = PokemonType & Document;

@Schema({ timestamps: true, versionKey: false })
export class PokemonType {
  @Prop({ required: true, trim: true, unique: true })
  name!: string;
}

export const PokemonTypeSchema = SchemaFactory.createForClass(PokemonType);
