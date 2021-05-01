import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonStatDocument = PokemonStat & Document;

@Schema({ timestamps: true, versionKey: false })
export class PokemonStat {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

  @Prop({ required: true, trim: true })
  value: string;
}

export const PokemonStatSchema = SchemaFactory.createForClass(PokemonStat);
